import React from 'react'
import Image from 'next/image'
import  logo from "@/images/animation.gif"

const loading = () => {
  return (
    <div className="h-screen flex items-center animate-bounce bg-black/20 ">
      <div className="grid content-center justify-center w-2/3 m-auto space-y-3 animate-bounce">
         <Image
          src={logo}
          alt="logo"
          className="mt-20 animate-pulse w-2/5 mx-auto"/>
        
        <h1 className="text-center text-gold text-2xl font-bold tracking-wider">
          Loading . . .
        </h1>
      </div>
    </div>
  );
}

export default loading