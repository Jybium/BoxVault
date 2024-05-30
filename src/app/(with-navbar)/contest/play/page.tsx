"use client"


import React, { useEffect, useState } from 'react';
import Quiz from '@/components/app-reusables/contest/Quiz';



const Page = () => {

  const [data, setData] = useState()

  const fetchQuiz = async () => {

    const response = await fetch("/api/quiz")
    const result = await response.json()

    console.log(result.data)
    setData(result.data)

  }

  useEffect(() => {

    fetchQuiz()

  }, [])





  return <div className="text-white">

    <Quiz data={data} />

  </div>
};

export default Page;
