"use client";

import { useCurrency } from "@/useStore/UniStore";
import { cn } from "@/utils/tailwindMerge";

const ItemCurrency = () => {
   const currency = useCurrency((state) => state.currency);

   const currentColor = cn(
      currency === "TMT"
         ? "text-green-600"
         : currency === "TON"
         ? "text-blue-600"
         : "text-orange-600"
   );
   return (
      <div className={`${currentColor} font-bold text-lg`}>
         {currency}
      </div>
   );
};

export default ItemCurrency;
