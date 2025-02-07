"use client";

import { useCurrency } from "@/useStore/UniStore";

const ItemCurrency = () => {
   const currency = useCurrency((state) => state.currency);

   const currentColor =
      currency === "TMT" ? "green" : currency === "TON" ? "blue" : "orange";
   return (
      <div className={`text-${currentColor}-500 font-bold text-lg`}>
         {currency}
      </div>
   );
};

export default ItemCurrency;
