"use client";

import React from "react";
import { useCurrency } from "../useStore/UniStore";
import { cn } from "@/utils/tailwindMerge";

const MainboxColor = ({ children }: { children: React.ReactNode }) => {
   const currency = useCurrency((state) => state.currency);
   const bg = cn(
      currency === "TMT"
         ? "bg-green-600/80"
         : currency === "TON"
         ? "bg-blue-600/80"
         : "bg-orange-600/80"
   );
   return (
      <main
         className={`${bg} backdrop-blur-[1px] relative flex flex-col items-center mt-8 w-[90%] m-auto rounded-3xl mb-48`}
      >
         {children}
      </main>
   );
};

export default MainboxColor;
