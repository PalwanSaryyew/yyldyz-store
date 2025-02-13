"use client";

import React from "react";
import { useCurrency } from "../useStore/UniStore";

const MainboxColor = ({ children }: { children: React.ReactNode }) => {
   const currency = useCurrency((state) => state.currency);
   return (
      <main
         className={`flex flex-col items-center bg-${
            currency === "TMT"
               ? "green"
               : currency === "TON"
               ? "blue"
               : "orange"
         }-500 mt-8 w-[90%] m-auto rounded-3xl mb-48`}
      >
         {children}
      </main>
   );
};

export default MainboxColor;
