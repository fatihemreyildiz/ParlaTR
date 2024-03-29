"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MarketPlaceAbi from "../contractsData/Marketplace.json";
import MarketPlaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import TestAddress from "../contractsData/Test-address.json"
import TestAbi from "../contractsData/Test.json"


export default function Index() {
  const { ethers } = require("ethers");
  const [loading, setLoading] = useState(true);
  
  let provider;
  if(typeof window !== "undefined"){
    provider = new ethers.BrowserProvider(window.ethereum)
  }
  const [Marketplace, setMarketplace] = useState(new ethers.Contract(MarketPlaceAddress.address, MarketPlaceAbi.abi,provider))
  const [NFT, setNFT] = useState(new ethers.Contract(NFTAddress.address, NFTAbi.abi, provider))
  const [Test, setTest] = useState(new ethers.Contract(TestAddress.address, TestAbi.abi, provider))
  const [accountCheck, setAccountCheck] = useState((window as any).ethereum._state && (window as any).ethereum._state.accounts.length > 0);
  const [account , setAccount] = useState((window as any).ethereum._state?.accounts[0]);

  window.ethereum.on('accountsChanged', async function (accounts:Array<string>) {
    if(accounts.length > 0){
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      console.log(signer)
      setMarketplace(new ethers.Contract(MarketPlaceAddress.address, MarketPlaceAbi.abi, signer))
      setNFT(new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer))
      setTest(new ethers.Contract(TestAddress.address, TestAbi.abi, signer))
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      window.location.reload();
    }
    setAccountCheck(accounts.length > 0);
  })

  useEffect(() => {
    if (window.ethereum) {
      initializeProvider()
    }
  }, [])

  const initializeProvider = async () => {
    if ((window as any).ethereum) {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner()
      setAccountCheck((window as any).ethereum._state && (window as any).ethereum._state.accounts.length > 0);
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      const block = await provider.getBlockNumber();
      loadContracts(signer)
    }

  }
  const loadContracts = async (signer:any) => {
    // Get deployed copies of contracts
    setMarketplace(new ethers.Contract(MarketPlaceAddress.address, MarketPlaceAbi.abi, signer))
    setNFT(new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer))
    setTest(new ethers.Contract(TestAddress.address, TestAbi.abi, signer))
    setLoading(false)
  }

  
  return (
    <div className="bg-gray-800">
      <Header
        initializeProvider={initializeProvider}
        accountCheck={accountCheck}
      />
      <Hero
        MarketPlaceContract={Marketplace}
        NFTContract={NFT}
        TestContract={Test}
        account={account}
      />
    </div>
  );
}
