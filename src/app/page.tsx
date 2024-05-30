"use client"

import React, { useState } from 'react'
import Carousels from '@/components/app-reusables/connect/Carousel'
import Header from '@/components/app-reusables/LandingPage/Header'
import { ethers, Signer } from 'ethers';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useModal } from "@/app/stores/context/modal";
import ConnectWallet from '@/components/app-reusables/connect/ConnectWallet';
import SplashScreen from '@/components/SplashScreen';
import { useRouter } from 'next/navigation';

const Page = () => {

  const route = useRouter();
  const { setWalletAddress } = useModal();
  const [connectedWallet, setConnectedWallet] = useState<ethers.Signer | PhantomWalletAdapter | null>(null);

  function isEthereumSigner(wallet: Signer | PhantomWalletAdapter): wallet is Signer {
    return 'getAddress' in wallet;
  }

  const onConnect = (wallet: Signer | PhantomWalletAdapter) => {
    setConnectedWallet(wallet);

    // Check if the wallet has the getAddress method
    if (isEthereumSigner(wallet)) {
      wallet.getAddress().then((address) => {
        console.log('Connected Ethereum wallet address:', address);
        setWalletAddress(address)
        route.push('/home')
      }).catch((error) => {
        console.error('Failed to get Ethereum wallet address:', error);
      });
    } else if (wallet instanceof PhantomWalletAdapter) {
      // Handle Solana wallet
      console.log('Connected Solana wallet address:', wallet.publicKey?.toString());
    }
  };

  return (
    <main>
      <SplashScreen />

      <Header />

      <section className='relative flex justify-between pt-[70px] items-center w-5/6 mx-auto '>

        <Carousels />
        <ConnectWallet onConnect={onConnect} />

      </section>
    </main>
  )
}

export default Page