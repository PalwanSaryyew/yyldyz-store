"use client";
import { useState } from "react";
import CurrencyBox from "./CurrencyBox";
import StoreBox from "./StoreBox";

const MainBox = ({tonPrice}: {tonPrice: number}) => {
   const [currency, setCurrency] = useState("TMT");
   return (
      <div
         className={`flex flex-col items-center bg-${
            currency === "TMT"
               ? "green"
               : currency === "TON"
               ? "blue"
               : "orange"
         }-500 mt-8 w-[90%] m-auto rounded-3xl`}
      >
         <CurrencyBox crChange={setCurrency} />
         <StoreBox currency={currency} tonPrice={tonPrice}/>
      </div>
   );
};

export default MainBox;
