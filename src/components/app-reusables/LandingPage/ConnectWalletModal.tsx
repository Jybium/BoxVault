"use client"
declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean;
            request: (request: { method: string; params?: any[] }) => Promise<any>;
        };
    }
}

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ethers } from 'ethers';
import { useModal } from "@/app/stores/context/modal";
import metamask from "../../../../public/metamask.png"
import walletConnect from "../../../../public/walletConnect.png"
import coinbase from "../../../../public/coinbase.png"
import phantom from "../../../../public/phantom.png"
import logo from "../../../../public/logo.png"
import WalletConnectProvider from '@walletconnect/web3-provider';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { FaWallet } from "react-icons/fa"
import Image from "next/image";

export function DialogCloseButton<Props = {}>({ onConnect }: { onConnect: (wallet: ethers.Signer | PhantomWalletAdapter) => void }) {
    const { walletAddress, setWalletAddress, disconnectWallet } = useModal();

    // Handler for connecting to MetaMask
    async function connectMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            try {
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                onConnect(signer);
            } catch (error) {
                console.error('MetaMask connection failed:', error);
            }
        } else {
            console.error('MetaMask not installed.');
        }
    };

    // Handler for connecting to WalletConnect
    const connectWalletConnect = async () => {
        alert('WalletConnect requires setup within your wallet app. Please follow the instructions.');
        const provider = new WalletConnectProvider({
            qrcode: true,
        });

        try {
            await provider.enable();
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
            onConnect(signer);
        } catch (error) {
            console.error('WalletConnect connection failed:', error);
        }
    };

    // Handler for connecting to Phantom (if you're working with Solana)
    const connectPhantom = async () => {
        const phantomWallet = new PhantomWalletAdapter();

        try {
            await phantomWallet.connect();
            const address = phantomWallet.publicKey?.toBase58();
            if (address) {
                setWalletAddress(address);
                onConnect(phantomWallet);
            } else {
                console.error('Failed to retrieve Phantom wallet address');
            }
        } catch (error) {
            console.error('Phantom connection failed:', error);
        }
    };

    function processText(text: string) {
        if (text.length <= 10) {
            return text;
        }
        const firstPart = text.slice(0, 5);
        const lastPart = text.slice(-5);
        return `${firstPart}...${lastPart}`;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex items-center gap-3 px-4 text-sm bg-buttons rounded-lg'>
                    <span><FaWallet size={23} /></span> {walletAddress ? <p className="text-ellipsis text-sm">{processText(walletAddress)}</p> : "Connect"}
                </Button>
            </DialogTrigger>

            {!walletAddress && (
                <DialogContent className="sm:max-w-md p-3 bg-hover rounded-lg">
                    <DialogHeader className="grid justify-center my-2">
                        <Image src={logo} alt="metamask icon" className="h-40 w-40 rounded-full " />
                    </DialogHeader>
                    <p className="text-white tracking-wider text-center text-lg">Connect to BoxVault</p>
                    <div className="grid items-center bg-secondary text-white tracking-wide rounded-lg">
                        <span className="flex gap-4 items-center px-5 py-2 relative hover:bg-gold hover:text-black hover:font-bold cursor-pointer" onClick={connectMetaMask}>
                            <Image src={metamask} alt="metamask icon" className="h-12 w-12 rounded-full" />
                            <p>Meta Mask</p>
                            <p className="absolute right-2 top-2 py-1 px-2 bg-hover text-sm rounded-md shadow-md">Detected</p>
                        </span>
                        <span className="flex gap-4 items-center px-5 py-2 hover:bg-gold hover:text-black hover:font-bold cursor-pointer" onClick={() => alert("Not available for now, please use other providers.")}>
                            <Image src={coinbase} alt="metamask icon" className="h-12 w-12 rounded-full" />
                            <p>Coin Base</p>
                        </span>
                        <span className="flex gap-4 items-center px-5 py-2 hover:bg-gold hover:text-black hover:font-bold cursor-pointer" onClick={connectPhantom}>
                            <Image src={phantom} alt="metamask icon" className="h-12 w-12 rounded-full" />
                            <p>Phantom</p>
                        </span>
                        <span className="flex gap-4 items-center px-5 py-2 hover:bg-gold hover:text-black hover:font-bold cursor-pointer" onClick={connectWalletConnect}>
                            <Image src={walletConnect} alt="metamask icon" className="h-12 w-12 rounded-full" />
                            <p>Wallet Connect</p>
                        </span>
                    </div>
                </DialogContent>
            )}

            {walletAddress && (
                <Button onClick={disconnectWallet} className="text-sm bg-red-600 text-white rounded-lg flex self-center">
                    Disconnect
                </Button>
            )}
        </Dialog>
    );
}
