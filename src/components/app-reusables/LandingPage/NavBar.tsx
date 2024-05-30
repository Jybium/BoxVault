"use client"



import React from 'react'
import data from "@/app/constants/navbar"
import Link from 'next/link'

import { usePathname } from 'next/navigation'


const NavBar = () => {

    const currentPath = usePathname()

    const firstPart = data.filter(item => item.id >= 1 && item.id <= 5);
    const secondPart = data.filter(item => item.id === 6 || item.id === 7);

    return (
        <div className='bg-primary h-[calc(100vh-70px)] lg:w-[136px] w-[100px] fixed py-3 shadow-lg drop-shadow-lg'>

            <nav className='text-white text-sm h-full'>
                <ul className="flex flex-col flex-1 justify-between h-full">
                    <div className="flex flex-col items-center gap-3">
                        {/* Render the first part of the data */}
                        {firstPart.map((item) => (
                            <li key={item.id} className={item.id.toString()}>
                                <Link href={item.to} className={`flex flex-col items-center text-center gap-1 px-4 py-1 rounded-lg ${currentPath === item.to ? 'bg-gold text-black' : ''
                                    }`}>
                                    
                                       
                                   
                                        <p className="text-2xl">{item.icon}</p>
                                        <p className="text-xs">{item.name}</p>
                                   
                                </Link>
                            </li>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        {/* Render the second part of the data */}
                        {secondPart.map((item) => (
                            <li key={item.id} className={item.id.toString()}>
                                <Link href={item.to} className={`flex flex-col items-center text-center gap-1 py-1 px-4 rounded-lg ${currentPath === item.to ? 'bg-gold text-black' : ''
                                    }`} >

                                        <p className="text-2xl">{item.icon}</p>
                                        <p className="text-xs">{item.name}</p>
                                    
                                </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar