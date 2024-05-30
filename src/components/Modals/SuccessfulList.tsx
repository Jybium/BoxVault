"use client"

import React from 'react'
import Link from "next/link"
import { PiBuildingOffice } from "react-icons/pi";
import { CalendarDays } from 'lucide-react';
import { toast } from 'react-hot-toast'
import { useModal } from '@/app/stores/context/modal';
import { useRouter } from 'next/navigation';


const SuccessfulList = () => {

  const {successModal, bid, setSuccessModal} = useModal()
  const router = useRouter()

  const HandleBid = () =>{
    router.push(`/bids/create-bid/${bid}`)
    setSuccessModal(false)
  }

  const HandleMarket = () =>{
    router.push(`/marketplace`)
    toast
    setSuccessModal(false)
  }

  return (

    <>
      {successModal &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md "></div>
          <div className="relative bg-secondary p-6 rounded-lg shadow-lg z-10 w-2/3 lg:max-w-lg mx-auto">

            <div className="bg-secondary text-center lg:my-10 my-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-white">Congratulation You Have Successfully Created Your NFT</h1>
              </div>


              <div className="lg:mt-10 my-6">
                <Link href="/marketplace" onClick={HandleMarket}>
                  <div className="space-y-5 p-8 bg-gold/30 rounded-t-md border border-deepGold">
                    <h2 className="text-2xl font-bold text-deepGold">
                      Add to marketplace
                    </h2>

                    <div className="rounded-md bg-gold border border-deepGold h-12 w-12 mx-auto flex items-center">
                      <PiBuildingOffice className="text-3xl text-primary mx-auto" />
                    </div>
                  </div>
                </Link>


                <Link href={`/bids/create-bid/${bid}`} onClick={HandleBid}>
                  <div className="space-y-5 bg-slate-500 p-8 rounded-b-md border border-purple">
                    <h2 className="text-2xl font-bold text-white">
                      Place for bidding
                    </h2>

                    <div className="rounded-md bg-gold border border-deepGold h-12 w-12 mx-auto flex items-center">
                      <CalendarDays className="text-3xl text-primary mx-auto" />
                    </div>
                  </div>
                </Link>


              </div>
            </div>
          </div>

        </div >
      }
    </>

  )
}

export default SuccessfulList