"use client";
import { useState } from "react";
import ItemBox from "./ItemBox";
import { starsDataTMT } from "../lib/data";

type StoreBoxProps = {
   currency: string;
};

const StoreBox = ({ currency }: StoreBoxProps) => {
   const [isOpen, setIsOpen] = useState(0);
   return (
      <div className="flex flex-col gap-4 py-8 w-full items-center">
         {starsDataTMT.map((item) => (
            <ItemBox
               key={item.id}
               isOpen={isOpen}
               chIsOpen={setIsOpen}
               id={item.id}
               currency={currency}
               quantity={item.quantity}
               price={item.price}
            />
         ))}
      </div>
   );
};

export default StoreBox;
