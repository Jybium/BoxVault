"use client"


import React, { useState } from 'react'
import axios from 'axios'
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
import Card from './Card';
import MarketModal from '@/components/Modals/MarketModal';
import {jerseyItems, trophyItems, momentItems} from "@/app/constants/marketPlace"


type Item = {
    id: number;
    name: string;
    title: string;
    imageURL: string;
    category: string;
}

interface MarketProps {
    data: 'jersey' | 'trophy' | 'moment';
}



const playfair_display = Playfair_Display({ subsets: ['latin'], weight: "400" })


const Screen = () =>{

    const [data, setData] = useState('jersey')
    const items = data === 'jersey' ? jerseyItems : data === 'trophy' ? trophyItems : momentItems;
    const [isPending, startTransition] = React.useTransition();
    const [id, setId] = useState(0)

    const form = useForm({
        defaultValues: {
            network: ""
        },
    });


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




    return(
        <div className="text-white">


            <h1 className='text-extrabold text-2xl' style={playfair_display.style}>Explore our marketplace</h1>


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


            <div className='lg:flex items-center lg:justify-between mt-4 lg:mt-2'>
                    <p className=""># Marketplace</p>
                <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-1">
                        <p className="bg-hover px-4 py-2 rounded-lg hover:bg-buttons cursor-pointer" style={playfair_display.style} onClick={() => setData('jersey')}>Iconic jerseys</p>
                    <p className="bg-hover px-4 py-2 rounded-lg hover:bg-buttons cursor-pointer" style={playfair_display.style} onClick={() => setData('trophy')}>Trophies</p>
                    <p className="bg-hover px-4 py-2 rounded-lg hover:bg-buttons cursor-pointer" style={playfair_display.style} onClick={() => setData('moment')}>Moments</p>
                        <p className="bg-hover px-4 py-2 rounded-lg hover:bg-buttons cursor-pointer" style={playfair_display.style}>SVEs</p>
                    </div>
            </div>


            <div className='mt-4 grid grid-cols-1 lg:grid-cols-4 justify-between gap-y-6 gap-x-5 '>
                {items.map((item: Item) => (
                    <MarketModal key={item.id} id={item.id} image={item.imageURL} text={item.title} name={item.name} />
                ))}
            </div>

        </div>
    )
}



export default Screen