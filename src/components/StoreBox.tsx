"use client";
import { useState } from "react";
import ItemBox from "./ItemBox";
import { starsDataTMT, starsDataTON, starsDataUSDT } from "../lib/data";

type StoreBoxProps = {
   currency: string;
   tonPrice: number
};

const StoreBox = ({ currency, tonPrice }: StoreBoxProps) => {
   const starsData =
      currency === "TMT"
         ? starsDataTMT
         : currency === "USDT"
         ? starsDataUSDT
         : starsDataTON;
   const [isOpen, setIsOpen] = useState(0);
   return (
      <div className="flex flex-col gap-4 py-8 w-full items-center">
         {starsData.map((item) => (
            <ItemBox
               key={item.id}
               isOpen={isOpen}
               chIsOpen={setIsOpen}
               id={item.id}
               currency={currency}
               quantity={item.quantity}
               price={item.price}
               tonPrice={tonPrice}
            />
         ))}
      </div>
   );
};

export default StoreBox;
