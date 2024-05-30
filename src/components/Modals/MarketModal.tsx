"use client"


import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'


const MarketModal = ({ image, text, name, id }: { image: string, text: string, name: string, id: number }) => {

  return (
    <Dialog>
      
        <DialogTrigger asChild>
          <div className='text-center grid gap-y-1 w-full h-fit font-bold'>
            <Image src={image} alt="" width={208} height={208} className='bg-black object-cover w-full h-[15rem] lg:h-[15rem] lg:w-[15rem] rounded-xl' />
            <p>{name}</p>
            <p className='text-gold font-thin '>{text}</p>
          </div>
        </DialogTrigger>


      <DialogContent className="sm:max-w-3xl p-3 bg-hover rounded-lg lg:h-4/6 h-[90%] w-full">
        <section className='lg:flex lg:justify-between items-center gap-4 h-full w-full'>

          <div className="relative flex-shrink-0 lg:h-full h-1/2 lg:w-1/2">
            <div className='h-full w-full overflow-hidden rounded-md'>
              <Image src={image} alt="" layout='fill' objectFit='cover' className='rounded-md' />
            </div>
            <div className="absolute bottom-4 left-0 w-full text-center">
              <Button className='bg-deepGold text-white w-4/6 font-bold mx-auto'>
                Buy now
              </Button>
            </div>
          </div>

          <div className="lg:h-full h-1/2 lg:w-1/2 flex flex-col justify-between text-white pr-6 overflow-y-auto mt-3 lg:mt-0">
            <div className='grid gap-3'>
              <h1 className='font-bold'>Iconic Gloves : Worn By Mike Tyson</h1>
              <p>{name}</p>
              <div className="font-bold text-white grid gap-3">
                <p className='text-sm'>Iconic design : <span className='font-light text-xs mt-1'>Red  with the famous mike Tyson Signature.</span></p>
                <p className='text-sm'>Historic Match : <span className='font-light text-xs mt-1'>Worn during the unforgettable champoionship defence early 2000’s.</span></p>
                
              </div>
            </div>

            <div className='font-bold'>
              <p className='text-sm'>Description : <span className='font-light text-xs mt-1 text-justify'>Step into the boots of a legend with “Maradona’s Magic '86”. This exclusive NFT immortalizes the jersey worn during one of football’s most talked-about matches. With each thread woven into the fabric of history, this digital collectible is a must-have for aficionados and collectors alike.</span></p>
            </div>
          </div>

        </section>
      </DialogContent>
    </Dialog>
  )
}

export default MarketModal
