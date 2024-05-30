"use client"



import React, { useEffect, useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import EventCard from './EventCard';
import getContract from '@/lib/contract';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/config';
import eventData from "@/app/constants/eventData";
import { ethers } from 'ethers';
import formatUnixTimestamp from "@/services/formatDate"
import Carousel from '../connect/Carousel';


const playfair_display = Playfair_Display({ subsets: ['latin'], weight: "400" });

interface Listing {
    id: number;
    lister: string;
    price: number;
    deadline: number;
    highestBidder: string;
    active: boolean;
}


const Screen = () => {
    const [activeListings, setActiveListings] = useState<Listing[]>([]);
    const [collection, setCollection] = useState(1);
    const [loading, setLoading] = useState(false);

    const getAllListings = async () => {
        const vaultContract = await getContract(NFT_CONTRACT_ADDRESS, NFT_ABI);
        try {
            setLoading(true);
            const result = await vaultContract.getAllListings();
            const listings: Listing[] = Object.values(result).map((listing: any) => ({
                id: listing[0],
                lister: listing[1],
                price: listing[2],
                deadline: listing[3],
                highestBidder: listing[4],
                active: listing[5]
            }));

            console.log(listings);
            setActiveListings(listings);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllListings();
    }, []);

    // Merge eventData and activeListings

    if(activeListings.length === 0) return <div className='text-2xl text-white text-center grid justify-center content-center'>No Active Events yet ...</div>;
    if(loading) return <div className='text-2xl text-white text-center grid justify-center content-center'>Loading ...</div>;
    
    const mergedData = eventData.events.map(event => {
        const listing = activeListings.find(listing => Number(listing.id) === event.id);
        if (listing) {
            return {
                id: listing.id, 
                status: `${listing.active ? "Active" : "Ended"}`,
                link: `/bids/place-bid/${listing.id}`, 
                highestBidder: listing.highestBidder,
                deadline: formatUnixTimestamp(listing.deadline),
                // @ts-ignore
                price: `${ethers.formatUnits(parseInt(listing.price, 10).toString(), 'ether').toString()} ETH`,
                image: event.image,
                title: event.title,
                details: event.details
            };
        } else {
            return {
                id: event.id,
                status: event.status,
                link: event.link,
                highestBidder: "",
                price: "",
                image: event.image,
                title: event.title,
                details: event.details
            };
        }
    });


    return (
        <div className='text-white'>
            <h1 className='text-extrabold text-2xl' style={playfair_display.style}>Top Events</h1>

            <Carousel/>
            <div className="relative w-full h-full">
                <div className={` ${collection === 0 ? "opacity-20" : ""} relative mt-4 grid grid-cols-1 lg:grid-cols-3 justify-between gap-5`}>
                    {mergedData.map((item: any) => (
                        <EventCard key={item.id} event={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Screen;
