import React from 'react'
import Screen from '@/components/app-reusables/leaderboard/Screen'

// Sample data representing each person's score
const scores = [10, 30, 50, 70, 90, 20, 40, 60, 80, 100]; 


const page = ({params}: {params: {bidId: string}}) => {
    return (
        <main>
            <h1 className="text-4xl font-bold mt-5 text-white">Leaderboard</h1>
            <p className="text-white text-xl mt-2 mb-2">See how you did compared with your colleagues ...... </p>
            <Screen scores={scores} bidId={params.bidId} />
        </main>
    )
}

export default page