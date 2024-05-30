"use client";

import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-4/5 h-2 bg-gray-300 rounded-full  mx-auto mt-5">
            <div
                className="absolute h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
            <div
                className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full"
                style={{ left: `calc(${progress}% - 10px)` }}
            >
                <Settings size={23} color="white" />
            </div>
        </div>
    );
};

export default ProgressBar;
