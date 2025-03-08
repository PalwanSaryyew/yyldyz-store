"use client";

import { useState } from "react";
import { useCartItem, useCurrency, useHandleModal } from "../../utils/UniStore";

import TmtUsdt from "../payments/TmtUsdt";
import Transactions from "../ton/Transactions";

const ChktMdl = () => {
   const openState = useHandleModal((state) => state.isOpen);
   const modalCloser = useHandleModal((state) => state.toogle);
   const currency = useCurrency((state) => state.currency);
   const item = useCartItem((state) => state.item);
   const [isLoading, setIsLoading] = useState(false);

   if (!openState) {
      return null;
   }
   return (
      <div className="bg-black/50 backdrop-blur-sm fixed w-full h-full flex items-center justify-center z-50">
         {/* Closer */}
         <div
            className="w-[100%] h-[100%] fixed"
            onClick={() => {
               if (isLoading) {
                  return;
               } else {
                  modalCloser();
               }
            }}
         ></div>
         {/* modal */}
         <div className="w-[80%] fixed bg-slate-300 rounded-2xl flex flex-col py-2">
            <div className="border-b border-slate-100 flex justify-between mb-2 px-12 pb-1">
               <div>Töleg görnüşi:</div>
               <div>{item?.currency}</div>
            </div>

            <div className="rounded-md overflow-hidden mx-2">
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Haryt:</div>
                  <div>{item?.product}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Sany:</div>
                  <div>{item?.amount}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Kime:</div>
                  <div>{item?.receiver}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Jemi toleg:</div>
                  <div>{item?.total}</div>
               </div>
            </div>
            <div className="w-full px-3 pt-2">
               {currency === "TON" ? (
                  <Transactions />
               ) : (
                  <TmtUsdt moadalCloserButt={setIsLoading} currency={currency} item={item} />
               )}
            </div>
         </div>
      </div>
   );
};

export default ChktMdl;
