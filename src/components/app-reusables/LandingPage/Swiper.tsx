"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import firstCarousel from "../../../../public/carousel-one.png"
import { Button } from '@/components/ui/button'


import carouselData  from "@/app/constants/carousel"

const Swiper = () => {
  const data = carouselData;

  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  {/* Calculate next slide index  */ }
  const nextSlide = (currentSlide + 1) % data.length;

  // Set up automatic slide transition using useEffect
  const interval = 5000; // 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
    }, interval);

    // Cleanup the timer when component unmounts
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, interval]);

  // Function to handle slide change on user interaction
  const handleSlideChange = (index: any) => {
    setCurrentSlide(index);
  };


  return (
    <div>
       <div className="bg-carousel-one bg-center h-[65vh] relative w-full">
        <div className="flex h-full w-full relative space-x-4">
          {/* Active slide (2/3 of the width)  */}
          <div className="w-2/3 relative">
            <div className="absolute bg-black/70 -z-20 top-0 left-0"></div>
            <Image
              src={data[currentSlide].image}
              alt={data[currentSlide].alt}
              width={500}
              height={500}
              className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
            />
            <div className="relative pl-5 pt-5 z-10 text-white w-2/3 h-4/5 flex flex-col justify-between">
              <h1 className="font-extrabold text-2xl">{data[currentSlide].title}</h1>
              <div className="w-4/6 font-thin text-sm grid gap-3">
                <h1 className="font-extrabold text-3xl">{data[currentSlide].headline}</h1>
                <p>{data[currentSlide].description}</p>
                <Button className="bg-secondary text-white font-thin border-white border rounded-3xl mt-5 w-fit">
                  See details
                </Button>
              </div>
            </div>
          </div>

           {/* Preview of next slide (1/3 of the width)  */}
          <div className="w-1/3 relative bg-black/10 bg-blend-overlay">
            

            <Image
              src={data[nextSlide].image}
              alt={data[nextSlide].alt}
              width={500} 
              height={500}
              className="absolute top-0 left-0  w-full h-full rounded-l-xl object-cover"
            />
            <div className="relative pl-5 pt-5 z-10 w-3/3 text-white h-4/5 flex flex-col justify-between">
              <h1 className="font-extrabold text-2xl">{data[nextSlide].title}</h1>
              <div className="w-4/6 font-thin text-sm grid gap-3">
                <h1 className="font-extrabold text-3xl">{data[nextSlide].headline}</h1>
                <p>{data[nextSlide].description}</p>
                <Button className="bg-secondary text-white font-thin border-white border rounded-3xl mt-5 w-fit">
                  See details
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation controls  */}
        <div className="carousel-indicators absolute -bottom-6 left-1/3 transform -translate-x-1/2 flex items-center space-x-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-gold w-3 h-3' : 'bg-gold/20'}`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </div> 
    

    </div>
  )
}

export default Swiper