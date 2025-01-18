"use client";

import { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTonAddress } from "@tonconnect/ui-react";

const Wallet = () => {
   // const rawAddress = useTonAddress(false);
   const [isLoading, setIsLoading] = useState(true);
   const [tonConnectUI] = useTonConnectUI();
   const userFriendlyAddress = useTonAddress();
   const formatAddress = (address: string) => {
      if (address.length < 1) {
         return null;
      }
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
   };

   const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(
      null
   );

   const handleWalletConnection = useCallback((address: string) => {
      setTonWalletAddress(address);
      console.log("Wallet connected successfully!");
      setIsLoading(false);
   }, []);

   const handleWalletDisconnection = useCallback(() => {
      setTonWalletAddress(null);
      console.log("Wallet disconnected successfully!");
      setIsLoading(false);
   }, []);

   useEffect(() => {
      const checkWalletConnection = async () => {
         if (tonConnectUI.account?.address) {
            handleWalletConnection(tonConnectUI.account?.address);
         } else {
            handleWalletDisconnection();
         }
      };

      checkWalletConnection();

      const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
         if (wallet) {
            handleWalletConnection(wallet.account.address);
         } else {
            handleWalletDisconnection();
         }
      });

      return () => {
         unsubscribe();
      };
   }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

   const handleWalletAction = async () => {
      if (tonConnectUI.connected) {
         setIsLoading(true);
         await tonConnectUI.disconnect();
      } else {
         await tonConnectUI.openModal();
      }
   };

   return (
      <button
         disabled={isLoading}
         onClick={handleWalletAction}
         className="bg-blue-500 text-white p-1 px-2 font-bold rounded-3xl ring-2 ring-white"
      >
         {isLoading
            ? "Garasyn..."
            : tonWalletAddress
            ? formatAddress(userFriendlyAddress)
            : "Gapjyk Bagla"}
      </button>
   );
};

export default Wallet;
