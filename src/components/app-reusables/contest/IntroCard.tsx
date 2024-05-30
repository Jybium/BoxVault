import React from 'react'
import Image from 'next/image'

const IntroCard = ({ text, icon, description, id }: { text: string, description: string, icon: string, id: number}) => {
    return (
        <div className='text-center flex flex-col justify-center gap-y-3' key={id}>
            <p className="flex items-center gap-x-3 bg-[#93B7BE]/20 w-fit mx-auto rounded-md py-1 px-4 text-lg font-bold">{text} <span className=""><Image src={icon} alt={text} className='w-5/6 mx-auto'/></span></p>
            <p className="font-thin">{description}</p>
        </div>
    )
}

export default IntroCard