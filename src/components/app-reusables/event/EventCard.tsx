import React from 'react'
import firstImage from "../../../../public/bidImage.png"
import secondImage from "../../../../public/bid1.png"
import thirdImage from "../../../../public/bid2.png"
import Image from 'next/image'
import Link from 'next/link'




const EventCard = ({ event }:{event:any}) => {

  console.log(event)

  return (
    <div className=''>
      <div className="p-2 bg-gold rounded-lg relative">
        <p className="absolute text-center top-3 left-[45%] text-white text-sm font-black">{event?.status}</p>
        <Link href={event?.link}>
          <Image src={event?.image} alt={event?.image} className='block w-full h-[18rem] m-auto object-cover rounded-lg' />
          <div className="mt-2">
            <h1 className="font-bold text-xl text-primary">{event?.title}</h1>
            <div className="flex justify-between bg-secondary p-3 rounded-lg text-sm mt-2">
              <div className="space-y-1">
                <p>{event?.details?.startInfo?.label}</p>
                <p>{event?.deadline}</p>
              </div>
              <div className="space-y-1">
                <p>{event?.details?.priceInfo?.label}</p>
                <p>{event?.price}</p>
              </div>
            </div>
            <p className="text-center text-primary font-bold">Highest Bidder: {event?.highestBidder?.slice(0, 10)} ........</p>
          
          </div>
        </Link>
      </div>
    </div>
  )
}

export default EventCard