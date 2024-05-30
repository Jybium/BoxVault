"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import BidImage from "../../../public/bidImage.png"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import biddingHistory from "@/app/constants/biddingHistory"

export default function Bid() {

    const router = useRouter()

    // const placeBid = () => {
    //     router.push("/bids/place-bid")
    //     toast.success("Processing")
    // }

    return (
        <Card className="max-w-lg h-screen text-white mx-auto bg-white/15 border-none border-0 rounded-md overflow-y-auto hide-scrollbar">
            <CardHeader className="">
                <Image src={BidImage} alt="fiery soccer" className="w-1/2 h-1/2 m-auto" />
            </CardHeader>
            <CardContent className="space-y-4">

                <div className="text-center space-y-3">
                    <CardTitle>Galaxy soccer</CardTitle>
                    <p className="text-gold text-4xl font-black">0.10 sol</p>
                    <p className="">This is the highest bid on this NFT</p>
                </div>

                <div className="flex justify-between border-b">Listing price <span>0.50 sol</span></div>
                <div className="flex justify-between border-b">Time left <span>2 days</span></div>

                <div className="mt-10">

                    <p className="font-black text-2xl">Bids on this NFT</p>

                    <div className="grid w-full items-center gap-4 mt-3">

                        <div className=" border border-white rounded-lg">
                            <table className="w-full text-center">
                                <thead>
                                    <tr>
                                        <th className="p-2">ID</th>
                                        <th className="p-2">Address</th>
                                        <th className="p-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {biddingHistory.map((item) => (
                                        <tr key={item.id} className='text-sm boder-b border-white'>

                                            <td className="p-2">{item.id}</td>
                                            <td className="p-2">{item.address.slice(0, 18)}.....</td>
                                            <td className="p-2"> = {" "}{item.price}{" "}Sol</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </CardContent>
         
        </Card>
    )
}
