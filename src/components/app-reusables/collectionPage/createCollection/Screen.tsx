//@ts-ignore
"use client"

import React, { useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'

import { ethers } from 'ethers';
import getContract from '@/lib/contract';
import { NFT_ABI } from '@/config';
import { NFT_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, ERC721_ABI } from "@/config";
import { onSubmitError } from "@/lib/utils";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/app/stores/context/modal';
import Image from 'next/image';


const playfair_display = Playfair_Display({ subsets: ['latin'], weight: "700" })

const formSchema = z.object({
  price: z.string(), // Assuming price is a string
  duration: z
    .string()

});

const Screen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const { setBid, setSuccessModal } = useModal()
  const [listing, setListing] = useState()
  const [loading, setLoading] = useState()
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      duration: "",
    },
  });


  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    setImageUrl(blobUrl);
  };


  const getSigner = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      return signer;
    }
  };



  const handleCreateListing = async (data: { price: number; duration: number }) => {
    try {

      toast.success("Requesting to create and execute listing...");

      const signer = await getSigner();
      const recipientAddress = await signer?.getAddress();
      const erc721Contract = await getContract(ERC721_CONTRACT_ADDRESS, ERC721_ABI);
      const vaultContract = await getContract(NFT_CONTRACT_ADDRESS, NFT_ABI);

      const deadline = data.duration;
      const price = ethers.parseUnits(data.price.toString(), "gwei");

      const tokenURI = "jybium";
      const mintRecipient = recipientAddress;

      // Mint NFT and wait for the transaction to be mined
      // @ts-ignore
      const mintTx = await erc721Contract.mintNFT(tokenURI, mintRecipient);
      //@ts-ignore
      const mintReceipt = await mintTx.wait();

      // Log the mint transaction receipt for debugging
      console.log("Mint transaction receipt:", mintReceipt);

      // Parse mint event to get tokenId
      const event = erc721Contract.interface.parseLog(mintReceipt.logs[0]);
      const tokenId = event?.args.tokenId;

      console.log(`Minted NFT with token URI: ${tokenURI} to ${recipientAddress} with tokenId: ${tokenId}`);

      toast.success("Token minted successfully. Creating and executing listing...");


      // Create the listing
      const createTx = await vaultContract.createListing(ERC721_CONTRACT_ADDRESS, tokenId, price, deadline);
      const createReceipt = await createTx.wait();

      // Log the create receipt for debugging
      console.log("Create transaction receipt:", createReceipt);

      // Decode logs using the contract interface
      const logs = createReceipt.logs.map((log: any) => vaultContract.interface.parseLog(log));

      // Find the ListingCreated event
      const listingCreatedEvent = logs.find((parsedLog: any) => parsedLog.name === 'ListingCreated');

      if (!listingCreatedEvent) {
        throw new Error("Failed to find ListingCreated event");
      }

      const listingId = listingCreatedEvent.args?.listingId;

      if (!listingId) {
        throw new Error("Failed to retrieve listingId from ListingCreated event");
      }

      console.log(`Listing created with ID: ${listingId}`);
      console.log('Listing details:', listingCreatedEvent.args.listing);

      setListing(listingId)
      toast.success("Listing created successfully");




      // Execute the listing
      const executeTx = await vaultContract.executeListing(listingId);
      const executeReceipt = await executeTx.wait();

      // Log the execute receipt for debugging
      console.log("Execute transaction receipt:", executeReceipt);

      // Decode logs using the contract interface
      const log = executeReceipt.logs.map((log: any) => vaultContract.interface.parseLog(log));

      // Find the ListingExecuted event
      const listingExecutedEvent = log.find((parsedLog: any) => parsedLog.name === 'ListingExecuted');

      const id = listingExecutedEvent.args.listingId;

      if (!listingExecutedEvent) {
        throw new Error("Failed to find ListingExecuted event");
      }

      console.log(`Listing executed with ID: ${listingExecutedEvent.args.listingId}`);
      console.log('Listing details:', listingExecutedEvent.args.listing);


      toast.success("Listing created and executed successfully");
      setBid(id)
      setSuccessModal(true)

    } catch (error: any) {
      console.error('Error creating or executing listing:', error);
      toast.error("Error during create or execute process");


      // Extract the error message
      let errorMessage = '';
      if (error.data && error.data.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'An error occurred while creating or executing the listing.';
      }

      // Display the error message as a notification
      toast.error(errorMessage);
    }
  };



  const onHandleSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        handleCreateListing(data)
      } catch (error: any) {
        console.error("Error logging in:", error.message);
        toast.error("Error logging in. Please try again later.");
      }
    });
  };

  return (
    <div className='text-white'>

      {/* HEADER / PAGE TITLE */}
      <div className='text-center'>
        <h1 className='text-2xl' style={playfair_display.style}>First you will need to create an NFT Collection</h1>
        <p className="">You will need to deploy and ERC-20 </p>
      </div>


      {/* ACTUAL FORM FOR CREATING THE NFT - COLLECTING THE DETAILS */}
      <section className="lg:flex justify-between mt-5">

        <div className='md:flex items-center space-x-4'>
          <div className="space-y-3">

            <div className="md:flex items-end space-x-4">
              <div className="">

                <label htmlFor="fileInput">Logo image</label>
                <div className="relative grid">

                  <div className="absolute top-0 left-0 h-full w-full bg-white/10 rounded-lg grid content-center z-30 ">
                    <div className='space-y-1 text-xs text-center'>
                      <p className='text-base'>Drag and drop media</p>
                      <p className="text-gold font-bold text-base">Browse media</p>
                      <p className="">Max size 50MB</p>
                      <p>JPG, PNG, GIF, SVG, Mp4 </p>
                    </div>
                  </div>
                  <input type="file" id="fileInput" className='relative h-60 w-60 opacity-0 rounded-lg z-40' onChange={handleFileChange} />
                </div>
              </div>


              {/* Image container */}
              
              {imageUrl && (
                <div className="m">
                  <Image src={imageUrl} alt="Chosen Image" width={160} height={160} className="h-60 w-60 rounded-lg" />
                </div>
              )}
            </div>
           
          </div>

        </div>


        <div className="md:w-2/5 mt-5">

          <Form {...form}>
            <form className='w-full grid gap-y-4' onSubmit={form.handleSubmit(onHandleSubmit, (errors) => {
              onSubmitError(errors);
            })}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing price (Must be greater than 100)</FormLabel>
                    <FormControl>
                      <Input
                        type="price"
                        className='text-primary w-full'
                        placeholder="Enter the listing price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration in seconds (must be greater than 100)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the listing duration"
                        className='text-primary mt-7'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4 hover:bg-gold hover:text-black" type="submit">
                {isPending ? "processing" : "Create listing"}
              </Button>
            </form>
          </Form>
        </div>


      </section>

    </div>
  )
}

export default Screen