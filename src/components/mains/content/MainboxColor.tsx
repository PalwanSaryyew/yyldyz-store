"use client";

import React from "react";
import { cn } from "@/utils/tailwindMerge";
import { useCurrency } from "@/utils/UniStore";

const MainboxColor = ({ children }: { children: React.ReactNode }) => {
   const currency = useCurrency((state) => state.currency);
   const bg = cn(
      currency === "TMT"
         ? "bg-orange-600/25 border-tmtColor"
         : currency === "TON"
         ? "bg-blue-600/25 border-tonColor"
         : "bg-green-600/25 border-usdtColor"
   );
   return (
      <main className={`relative w-[90%] m-auto mb-48`}>
         <div
            className={`${bg} backdrop-blur-[1px] w-[98%] rounded-b-3xl border-[2px]`}
         >
            {children}
         </div>
      </main>
   );
};

export default MainboxColor;
