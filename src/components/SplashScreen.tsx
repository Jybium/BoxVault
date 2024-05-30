"use client"


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from "@/images/animation.gif"
import ProgressBar from './ProgressBar';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            
        }, 10000);

        // Cleanup the timer if the component unmounts before 5 seconds
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className='w-full fixed h-screen flex items-center bg-secondary z-50'>
            <div className="grid w-5/6 m-auto space-y-3">
                <div className="flex items-center space-x-3 text-white text-2xl font-bold w-fit mx-auto">
                    <Image src={logo} alt="logo" className="w-2/3 mx-auto rounded-full animate-pulse" />
                    <p>BoxVault</p>
                </div>
                <div className="flex">
                    <ProgressBar />
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
