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
   const [input, setInput] = useState("8");
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
                  <div>
                     {item?.product === "Tg Premium" ? "Wagty:" : "Sany:"}
                  </div>
                  <div>
                     {item?.product === "Tg Premium"
                        ? item.amount + " aý"
                        : item?.amount}
                  </div>
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
            {currency === "TMT" && (
               <div className="px-3 ">
                  <label className="text-sm text-orange-700" htmlFor="mobile">
                     Aşakda tölegi geçirýan tmcell belgisini giriziň!
                  </label>
                  <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     className="w-full border-none p-2 outline-none bg-white rounded-lg"
                  />
                  <label className="text-sm text-orange-700" htmlFor="mobile">
                     Töleg diňe tmcell belgiden belgä amala aşyrylýar!
                  </label>
               </div>
            )}

            <div className="w-full px-3 pt-2">
               {currency === "TON" ? (
                  <Transactions />
               ) : (
                  <TmtUsdt
                     mobile={input}
                     moadalCloserButt={setIsLoading}
                     currency={currency}
                     item={item}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default ChktMdl;
