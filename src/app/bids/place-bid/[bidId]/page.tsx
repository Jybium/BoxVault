"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import BidImage from "@/images/carousel-one.jpg"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ERC20_ABI, ERC20_CONTRACT_ADDRESS, ERC721_ABI, ERC721_CONTRACT_ADDRESS, NFT_ABI, NFT_CONTRACT_ADDRESS } from "@/config"
import getContract from "@/lib/contract"
import { ethers } from "ethers"

export default function PlaceBid({ params }: { params: { bidId: string } }) {

  const [bidPrice, setBidPrice] = React.useState('')

  const { bidId } = params

  const router = useRouter()

  const executeBid = async (bidId: any) => {

    const vaultContract = await getContract(NFT_CONTRACT_ADDRESS, NFT_ABI);
    const tokenContract = await getContract(ERC721_CONTRACT_ADDRESS, ERC721_ABI);

    try {
      // Get bid details
      const bid = await vaultContract.getBid(bidId);
      const { tokenId, lister, highestBidder, highestBid } = bid;

      // Check if the contract has approval to transfer the token
      const approved = await tokenContract.getApproved(tokenId);
      if (approved !== NFT_CONTRACT_ADDRESS) {
        // If not approved, approve the contract to transfer the token
        const approvalTx = await tokenContract.approve(NFT_CONTRACT_ADDRESS, tokenId);
        // @ts-ignore
        await approvalTx.wait();
      }

      const executeBidTx = await vaultContract.executeBid(bidId);
      const executeBidReceipt = await executeBidTx.wait();
      // Perform other actions related to bid execution if necessary


      if (!executeBidReceipt) {
        throw new Error("Error executing bid");
      }

      console.log("Bid executed successfully", executeBidReceipt);
      // Notify success and route to /events
      toast.success("Bid executed successfully");
    

    } catch (error) {
      console.error("Error executing bid:", error);
      toast.error("Error executing bid");
    }
  };



  const placeBid = async () => {
   

    const vaultContract = await getContract(NFT_CONTRACT_ADDRESS, NFT_ABI);
    const erc20Contract = await getContract(ERC20_CONTRACT_ADDRESS, ERC20_ABI);

    const tokenId = bidId;
    const price = ethers.parseUnits(bidPrice.toString(), "gwei");

    try {
      // Validate inputs
      if (!tokenId || tokenId.length === 0) {
        toast.error("Invalid listing ID");
        return;
      }
      if (!price || price.toString().length === 0) {
        toast.error("Invalid bid amount");
        return;
      }

      // Approve the ERC20 token transfer
      console.log(`Approving transfer of ${price} tokens to vault address ${NFT_CONTRACT_ADDRESS}`);
      const approvalTx = await erc20Contract.approve(NFT_CONTRACT_ADDRESS, Number(price));
      // @ts-ignore
      const approvalReceipt = await approvalTx.wait();
      console.log("Approval transaction receipt:", approvalReceipt);

      // Place the bid
      console.log(`Placing bid of ${price} on listing ${tokenId}`);
      const bidTx = await vaultContract.placeBid(tokenId, price);
      const bidReceipt = await bidTx.wait();
      console.log("Bid transaction receipt:", bidReceipt);

      // Notify success
      toast.success(`Placed bid of ${ethers.formatUnits(price, "ether")} ETH on listing ${tokenId}`);
      console.log(`Placed bid of ${ethers.formatUnits(price, "ether")} ETH on listing ${tokenId}`);


      setTimeout(() => {
        toast.success("Execcuting bid ...")}, 3000)

        await executeBid(bidId)
      // Redirect to events page

      setTimeout(() => {
      router.push(`/leaderboard/${tokenId}`)}, 5000)
    } catch (error: any) {
      console.error("Error placing bid:", error);

      // Check for specific error messages if available and display appropriate toast notifications
      if (error.code === "CALL_EXCEPTION" && error.reason) {
        toast.error(`Transaction failed: ${error.reason}`);
      } else {
        toast.error("Error during bid placement");
      }
    }
  };

  return (
    <Card className="max-w-md h-screen text-white mx-auto bg-white/15 border-none border-0 rounded-md overflow-y-auto hide-scrollbar">
      <CardHeader className="">
        <Image src={BidImage} alt="fiery soccer" className="w-1/2 h-1/2 m-auto" />
      </CardHeader>
      <CardContent className="space-y-4">

        <div className="text-center space-y-3">
          <CardTitle>Galaxy soccer</CardTitle>
          <p className="text-gold text-4xl font-black">0.10 sol</p>
          <p className="">This is the highest bid on this NFT</p>
        </div>

        <div className="flex justify-between border-b">Listing price <span>0.50 sol</span></div>
        <form className="mt-3">
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Bidding price</Label>
              <Input id="name" placeholder="Enter the price you want to bid for" className="text-black" onChange={(e) => {
                e.preventDefault();
                setBidPrice(e.target.value)
              }} />
             
            </div>
          </div>

        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" className="bg-purple w-full text-white" onClick={placeBid}>Place Bid</Button>
      </CardFooter>
    </Card>
  )
}
