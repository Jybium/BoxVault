
"use client"


import React, { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { onSubmitError } from "@/lib/utils";
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';
import web3Images from "../../../../public/web3-coins.svg"
import Image from 'next/image';
import data, { days } from "@/app/constants/collection"
import getContract from '@/lib/contract';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/config';



const playfair_display = Playfair_Display({ subsets: ['latin'], weight: "400" })

const Collections = () => {
    const [isPending, startTransition] = React.useTransition();
    const [id, setId] = useState(0)

    const form = useForm({
        defaultValues: {
            network: ""
        },
    });



    const getAllNFTs = async () => {
        const vaultContract = await getContract(NFT_CONTRACT_ADDRESS, NFT_ABI);
        try {
            const result = await vaultContract.getAllNFTs();
            // const listings = Object.values(result).map((listing: any) => ({
            //   id: listing[0],
            //   lister: listing[1],
            //   price: listing[2],
            //   deadline: listing[3],
            //   highestBidder: listing[4],
            //   active: listing[5]
            // }));

            // console.log(listings);
            // setActiveListings(listings);

            console.log(result);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    useEffect(() => {
        getAllNFTs();
    }, []);


    const onHandleSubmit = async (data: any) => {
        startTransition(async () => {
            try {
                //   code to hit backend
            } catch (error: any) {
                console.error("Error logging in:", error.message);
                // Handle any errors here, such as displaying an error message to the user
                toast.error("Error logging in. Please try again later.");
            }
        });
    };
    return (
        <div className='text-white mt-5 pr-5'>
            <h1 className='text-extrabold text-2xl' style={playfair_display.style}>Top Collections</h1>
            <div className='lg:flex items-center gap-3'>

                <div className='w-auto flex items-center gap-2 bg-background rounded-2xl py-1 px-4 text-white mt-5 mb-6'>
                    <Image src={web3Images} alt='' className='w-[30%]' />
                    <div className=''>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onHandleSubmit, (errors) => {
                                    onSubmitError(errors);
                                })}
                                className=""
                            >
                                <FormField
                                    control={form.control}
                                    name="network"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl className="">
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='bg-transparent  backdrop-blur-sm placeholder:text-gray placeholder:text-xs border-0 text-gray active:border-0 active:outline-0 focus:border-0 outline-none w-fit p-2 h-0 mr-2'>
                                                            <SelectValue placeholder="All network" className='mr-3 border-0 text-gray active:border-0 active:outline-0 focus:border-0 outline-none' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="all">All Network</SelectItem>
                                                        <SelectItem value="usa">USA</SelectItem>
                                                        <SelectItem value="uk">UK</SelectItem>
                                                        <SelectItem value="nigeria">Nigeria</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                </div>



                <div className='bg-background flex items-center justify-between w-fit px-4 rounded-2xl text-sm font-bold text-white'>
                    {
                        days.map((item) =>
                            <p key={item.id} className={` ${id == item.id ? "bg-hover rounded-2xl" : ""}  cursor-pointer py-2 px-3`} onClick={() => setId(item.id)}>{item.day}</p>
                        )
                    }
                </div>

            </div>


            {/* This renders the table */}
            <div>
                <div className="mx-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 hidden">
                                <th className="p-2 w-20">ID</th>
                                <th className="p-2 w-36">Name</th>
                                <th className="p-2 w-48">Collection</th>
                                <th className="p-2 w-20">Price</th>
                                <th className="p-2 w-24">Volume</th>
                                <th className="p-2 w-24">Top Offer</th>
                                <th className="p-2 w-24">Listed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className='text-sm'>
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2 flex items-center gap-2">{item.id !== "#" && <span className='relative'><p className='w-9 h-9 bg-black rounded-full relative'></p><p className='w-4 h-4 bg-red-400 rounded-full absolute -top-1 -right-1'></p></span>}{item.name}</td>
                                    <td className="p-2">{item.collection}</td>
                                    <td className="p-2">{item.price}</td>
                                    <td className="p-2">{item.volume}</td>
                                    <td className="p-2">{item["Top Offer"]}</td>
                                    <td className="p-2">{item.listed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Collections