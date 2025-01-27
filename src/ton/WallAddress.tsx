"use client";
import { useTonAddress } from "@tonconnect/ui-react";

const WallAddress = () => {
   const userFriendlyAddress = useTonAddress();

   return <div>{userFriendlyAddress && userFriendlyAddress} </div>;
};

export default WallAddress;
