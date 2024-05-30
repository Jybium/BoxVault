"use client"


import React, { useEffect, useState } from 'react';

const Timer = ({ timeLimit, handleTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      if (timeLeft === 0) {
        handleTimeUp();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    return <div className='mt-2'>{timeLeft} seconds left</div>;
};

export default Timer;
