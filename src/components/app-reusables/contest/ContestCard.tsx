import React from 'react'
import Image, { StaticImageData } from 'next/image'

const ContestCard = ({ text, icon, description, id }: { text: string, description: string, icon: StaticImageData, id: number }) => {
    return (
        <div className='relative gap-y-3' key={id}>
            <Image src={icon} alt={text} className='relative ' />

            <div className="absolute bottom-6 gap-y-5 left-[15%] w-2/3 rounded-t-md mx-auto text-center  text-sm bg-secondary">

                <p className="font-black">{text}</p>
                <p className="text-xs font-thin">{description}</p>

            </div>
            <p className='text-left'>Random trivia</p>
        </div>
    )
}

export default ContestCard