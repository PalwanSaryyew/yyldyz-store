"use client";
import { FaStar } from "react-icons/fa";
import { useCartItem, useHandleModal } from "../useStore/UniStore";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Star } from "@prisma/client";
interface ItemBoxProps {
   item: Star;
   currency: string;
   isOpen: number;
   tonPrice: number;
   chIsOpen: (isOpen: number) => void;
}

const ItemBox = ({
   item,
   currency,
   isOpen,
   chIsOpen,
   tonPrice,
}: ItemBoxProps) => {
   const change = useCartItem((state) => state.add);
   const priceOnCurrency =
      currency === "TMT"
         ? item.priceTMT
         : currency === "USDT"
         ? item.priceUSDT
         : item.priceUSDT / tonPrice;
   const open = isOpen;

   const currentColor =
      currency === "TMT" ? "green" : currency === "TON" ? "blue" : "orange";

   const modalOpener = useHandleModal((state) => state.toogle);
   const rawAddress = useTonAddress(false);
   const [tonConnectUI /* setOptions */] = useTonConnectUI();
   return (
      <div className="w-full">
         {/*  info */}
         <div
            className="bg-white flex w-[90%] rounded-t-lg p-2 items-center justify-between mx-auto"
            onClick={() => {
               chIsOpen(open === item.id ? 0 : item.id);
            }}
         >
            {/* left */}
            <div className="flex items-center gap-4">
               {/* star icon */}
               <div className="">
                  <FaStar color="orange" size={28} />
               </div>
               {/* star quantity*/}
               <div className="text-[1.3rem] font-semibold text-gray-600">
                  {item.amount}
               </div>
            </div>

            {/* right */}
            <div className="flex items-center gap-4">
               {/* price */}
               <div className="text-lg font-semibold text-gray-600">
                  {currency === "TON" ? priceOnCurrency.toFixed(4): priceOnCurrency}
               </div>

               {/* currency */}
               <div className={`text-${currentColor}-500 font-bold text-lg`}>
                  {currency}
               </div>
            </div>
         </div>

         {/* openable bottom section */}
         <div
            className={`${
               open === item.id ? "block" : "hidden"
            } bg-white w-[90%] rounded-b-lg p-2 items-center mx-auto`}
         >
            {/* input box */}
            <div
               className={`bg-${currentColor}-500 mx-auto p-1 rounded-lg flex items-center justify-between`}
            >
               <div className="text-gray-100 font-semibold text-lg pr-1">@</div>
               <div className="overflow-hidden px-1 flex-1">
                  <input
                     type="text"
                     name=""
                     id=""
                     className="border-none w-full outline-none bg-transparent text-gray-100 font-medium text-lg placeholder:text-gray-200/80 placeholder:text-base"
                     placeholder="username"
                  />
               </div>
               <button
                  onClick={() => {
                     if (rawAddress) {
                        change({
                           haryt: "Yyldyz",
                           sany: item.amount,
                           kime: "Emeki",
                           jemi:
                              currency === "TON"
                                 ? parseFloat(priceOnCurrency.toFixed(4))
                                 : Number(priceOnCurrency),
                        });
                        modalOpener();
                     } else {
                        tonConnectUI.openModal();
                     }
                  }}
                  className="bg-white text-black px-4 py-2 rounded-lg ring-1 ring-blue"
               >
                  Buy
               </button>
            </div>
         </div>
      </div>
   );
};

export default ItemBox;
