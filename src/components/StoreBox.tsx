"use client";
import { useState } from "react";
import ItemBox from "./ItemBox";
import { useCurrency } from "../useStore/UniStore";
import { Star } from "@prisma/client";

type StoreBoxProps = {
   tonPrice: number;
   starsData: Star[];
};

const StoreBox = ({ starsData, tonPrice }: StoreBoxProps) => {
   const currency = useCurrency((state) => state.currency);

   const [isOpen, setIsOpen] = useState(0);
   return (
      <div className="flex flex-col gap-4 py-8 w-full items-center">
         {starsData.map((item) => (
            <ItemBox
               item={item}
               key={item.id}
               isOpen={isOpen}
               chIsOpen={setIsOpen}
               currency={currency}
               tonPrice={tonPrice}
            />
         ))}
      </div>
   );
};

export default StoreBox;
