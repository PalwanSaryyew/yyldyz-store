"use client";
import { useHandleModal } from "../store/UniStore";
import { Sending } from "../ton/Sending";
import MyTonProvider from "../ton/TonProvider";

const ChktMdl = () => {
   const openState = useHandleModal((state) => state.isOpen);
   const modalCloser = useHandleModal((state) => state.toogle);

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
                  <div>Yyldyz</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Sany</div>
                  <div>250</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Kime</div>
                  <div>Emeki</div>
               </div>
               <div className="bg-slate-100 p-1 even:bg-gray-200 flex justify-between">
                  <div>Jemi toleg</div>
                  <div>0.5</div>
               </div>
            </div>
            <div className="bg-blue-500 mt-3 mx-1 py-2 text-white rounded-lg ring-inherit ring-2 ring-blue-400 flex items-center justify-center">
               <MyTonProvider>
                  <Sending />
               </MyTonProvider>
            </div>
         </div>
      </div>
   );
};

export default ChktMdl;
