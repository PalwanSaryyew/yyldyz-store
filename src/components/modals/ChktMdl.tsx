"use client";

import {
   useCartItem,
   useCurrency,
   useHandleModal,
} from "../../useStore/UniStore";

import { ReactNode } from "react";

import TmtUsdt from "../payments/TmtUsdt";

interface ChktMdlProps {
   children: ReactNode;
}

const ChktMdl = ({ children }: ChktMdlProps) => {
   const openState = useHandleModal((state) => state.isOpen);
   const currency = useCurrency((state) => state.currency);
   const modalCloser = useHandleModal((state) => state.toogle);
   const item = useCartItem((state) => state.item);

   if (!openState) {
      return null;
   }
   return (
      <div className="bg-black/50 backdrop-blur-sm fixed w-full h-full flex items-center justify-center z-50">
         {/* Closer */}
         <div
            className="w-[100%] h-[100%] fixed"
            onClick={() => modalCloser()}
         ></div>
         {/* modal */}
         <div className="w-[80%] fixed bg-slate-300 rounded-2xl flex flex-col py-2">
            <div className="border-b border-slate-100 flex justify-between mb-2 px-12 pb-1">
               <div>Töleg görnüşi:</div>
               <div>{item.currency}</div>
            </div>

            <div className="rounded-md overflow-hidden mx-2">
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Haryt:</div>
                  <div>{item.product}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Sany:</div>
                  <div>{item.amount}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Kime:</div>
                  <div>{item.receiver}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Jemi toleg:</div>
                  <div>{item.total}</div>
               </div>
            </div>
            <div className="w-full px-3 pt-2">
               {currency === "TON" ? (
                  children
               ) : (
                  <TmtUsdt currency={currency} item={item} />
               )}
            </div>
         </div>
      </div>
   );
};

export default ChktMdl;
