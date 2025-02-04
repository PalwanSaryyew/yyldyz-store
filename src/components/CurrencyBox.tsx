"use client";

import { useCurrency } from "../useStore/UniStore";

const CurrencyBox = () => {
   const changeCurrency = useCurrency((state) => state.change);
   return (
      <div className="w-full rounded-3xl flex text-white overflow-hidden font-bold">
         <div
            className={`flex-1 text-center py-2 bg-green-500`}
            onClick={() => {
               changeCurrency("TMT");
               console.log('yess');
               
            }}
         >
            TMT
         </div>
         <div
            className={`flex-1 text-center py-2 bg-orange-500`}
            onClick={() => {
               changeCurrency("USDT");
               console.log('yess');
            }}
         >
            USDT
         </div>
         <div
            className={`flex-1 text-center py-2 bg-blue-500`}
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
