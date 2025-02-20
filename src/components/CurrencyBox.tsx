"use client";

import { useCurrency } from "../useStore/UniStore";

const CurrencyBox = () => {
   const changeCurrency = useCurrency((state) => state.change);
   return (
      <div className="w-full cursor-pointer rounded-3xl flex text-white overflow-hidden font-bold">
         <div
            className={`flex-1 text-center py-2 bg-green-600`}
            onClick={() => {
               changeCurrency("TMT");
               
               
            }}
         >
            TMT
         </div>
         <div
            className={`flex-1 text-center py-2 bg-orange-600`}
            onClick={() => {
               changeCurrency("USDT");
              
            }}
         >
            USDT
         </div>
         <div
            className={`flex-1 text-center py-2 bg-blue-600`}
            onClick={() => {
               changeCurrency("TON");
            }}
         >
            TON
         </div>
      </div>
   );
};

export default CurrencyBox;
