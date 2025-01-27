"use client";
import Transactions from "@/ton/Transactions";
import { useCartItem, useHandleModal } from "../store/UniStore";

const ChktMdl = () => {
   const openState = useHandleModal((state) => state.isOpen);
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
               <div>Toleg gornusi </div>
               <div>TON</div>
            </div>
            <div className="rounded-md overflow-hidden mx-2">
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Haryt</div>
                  <div>{item.haryt}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Sany</div>
                  <div>{item.sany}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Kime</div>
                  <div>{item.kime}</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Jemi toleg</div>
                  <div>{item.jemi}</div>
               </div>
            </div>
            <div className="bg-blue-500 mt-3 mx-1 py-2 text-white rounded-lg ring-inherit ring-2 ring-blue-400 flex items-center justify-center">
               <Transactions amount={item.jemi}/>
            </div>
         </div>
      </div>
   );
};

export default ChktMdl;
