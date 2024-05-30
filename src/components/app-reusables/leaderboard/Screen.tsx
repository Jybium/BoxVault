/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { NFT_ABI, NFT_CONTRACT_ADDRESS } from "@/config";
import getContract from "@/lib/contract";
import { useEffect, useState } from "react";

const Screen= ({ scores, bidId }: {scores:number[], bidId: string}) => {


  const [activeListings, setActiveListings] = useState([]);
  const [collection, setCollection] = useState(1);

  const getBid = async () => {
    const vaultContract = await getContract(NFT_CONTRACT_ADDRESS, NFT_ABI);
    try {
      const result = await vaultContract.getBid(bidId);
      // const listings = Object.values(result).map((listing: any) => ({
      //   id: listing[0],
      //   lister: listing[1],
      //   price: listing[2],
      //   deadline: listing[3],
      //   highestBidder: listing[4],
      //   active: listing[5]
      // }));

      // console.log(listings);
      // setActiveListings(listings);

    console.log(result);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    getBid();
  }, []);
  
  const sortedScores = [...scores].sort((a, b) => a - b);

  
  const calculateColor = (rank: number) => {
    if (rank <= 4) {
      
      const brightness = Math.floor((rank / 4) * 205) + 50;
      return `rgb(0, ${brightness}, 0)`;
    } else if (rank <= 8) {
      
      const brightness = Math.floor(((rank - 4) / 4) * 205) + 50;
      return `rgb(255, ${brightness}, 0)`;
    } else {
      
      const brightness = Math.floor(((rank - 8) / (sortedScores.length - 8)) * 205) + 50;
      return `rgb(255, 0, ${brightness})`;
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2 w-full mb-6">
      {/* Generate sticks for each person's score */}
      {sortedScores.map((score, index) => (
        <div
          key={index}
          className="rounded"
          style={{ width: `${((score - 10) / Math.max(...sortedScores)) * 100}%`, height: '35px', backgroundColor: calculateColor(index + 1) }}
        />
      ))}
    </div>
  );
};

export default Screen;
