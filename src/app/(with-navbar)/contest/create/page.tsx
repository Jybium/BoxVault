"use client"

import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Playfair_Display } from 'next/font/google'
import { useRouter } from 'next/navigation'
import getContract from '@/lib/contract'
import { ethers } from 'ethers'
import { toast } from 'sonner'

import { GAMING_CONTRACT_ADDRESS, GAMING_NFT_ABI } from '@/config'




const playfair_display = Playfair_Display({ subsets: ['latin'], weight: "400" })


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    threshold: z.string(),
    durationInSeconds: z.string(),
    tokenId: z.string()
})



const Page = () => {

    const [nfts, setNfts] = useState()

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            threshold: "",
            durationInSeconds: "",
            tokenId: ""
        },
    })



    const createGameListing = async (data:any) => {

        const contract: any = await getContract(GAMING_CONTRACT_ADDRESS, GAMING_NFT_ABI);
        const nftaddress = "0x63cEd545f1Ee372EB59790AF6D80db814BD43AFE"
        

        try {
            // Create the listing
            const transaction = await contract.createListing(data.name, data.threshold,data.tokenId, data.durationInSeconds, nftaddress);

            const result = await transaction.wait();

            // Log transaction hash and gas used
            console.log('Transaction Hash:', result.transactionHash);
            console.log('Gas Used:', result.gasUsed.toString());

            // Check if the transaction was successful
            if (result.status !== 1) {
                toast.error("Transaction failed!");
                throw new Error('Transaction failed');

            }

            console.log(result);


            // Access the returned data if needed
            const approvedNFTs = result.events[0].args.createListing;
            console.log('Approved NFTs:', approvedNFTs);


            // Initialize a variable to hold the listingId
            let listingId;

            // Parse logs to find the ListingCreated event
            for (const log of result.logs) {
                const parsedLog = contract.interface.parseLog(log);
                if (parsedLog?.name === '') {
                    listingId = parsedLog?.args?.listingId;
                    console.log(`Listing created with ID: ${listingId}`);
                    console.log('Listing details:', parsedLog?.args.listing);
                }
            }

        } catch (error) {
            console.error('Error fetching NFTs:', error);
            toast.error("Error fetching NFTs");
        }
    };


    const getApprovedListing = async () => {
        const contract = await getContract(GAMING_CONTRACT_ADDRESS, GAMING_NFT_ABI);
        

        try {
            // Create the listing
            const approvedNFT = await contract.getApprovedNFTs();

            // const result = await transaction.wait();

            // Assuming approvedNFTs is an array of approved NFTs
            console.log('Approved NFTs:', approvedNFT);

            // // Log transaction hash and gas used
            // console.log('Transaction Hash:', result.transactionHash);
            // console.log('Gas Used:', result.gasUsed.toString());

            // // Check if the transaction was successful
            // if (result.status !== 1) {
            //     toast.error("Transaction failed!");
            //     throw new Error('Transaction failed');

            // }

            // console.log(result);


            // // Access the returned data if needed
            // const approvedNFTs = result.events[0].args.approvedNFTs;
            // console.log('Approved NFTs:', approvedNFTs);


            // // Initialize a variable to hold the listingId
            // let listingId;

            // // Parse logs to find the ListingCreated event
            // for (const log of result.logs) {
            //     const parsedLog = contract.interface.parseLog(log);
            //     if (parsedLog?.name === '') {
            //         listingId = parsedLog?.args?.listingId;
            //         console.log(`Listing created with ID: ${listingId}`);
            //         console.log('Listing details:', parsedLog?.args.listing);
            //     }
            // }

        } catch (error) {
            console.error('Error fetching NFTs:', error);
            toast.error("Error fetching NFTs");
        }
    };


    useEffect(() => {
      
    getApprovedListing()
    
    }, [])
    


    function onSubmit(values: z.infer<typeof formSchema>) {

        createGameListing(values)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <main className='text-white grid gap-y-10'>


            {/* <div className="flex justify-end">

                <Button className='bg-purple' onClick={() => router.push('/contest/create')}>Create</Button>

            </div> */}


            <div className="text-center grid gap-y-3"><h1 className='text-3xl font-extrabold' style={playfair_display.style}>Join and Play</h1><p className="font-thin">Soccer Vault challenges are exclusive competitions that revolve around legendary football moments, trophies, and player items.</p></div>


            <div className="mt-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-5">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contest name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a contest name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your contest public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="threshold"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Context threshold</FormLabel>
                                    <FormControl>
                                        <Input maxLength={2} placeholder="10" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is winning point from your contest, you can only choose between 1 - 10.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="durationInSeconds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contest duration</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your contest duration" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="86400">1 day</SelectItem>
                                            <SelectItem value="259200">3 days</SelectItem>
                                            <SelectItem value="604800">7 days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                   
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="tokenId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contest reward (Token Id)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an NFT token as reward" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </FormItem>
                            )}
                            />

                            </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </div>


        </main>
    )
}

export default Page

