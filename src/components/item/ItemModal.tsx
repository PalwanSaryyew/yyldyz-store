"use client";
import { Product } from "@prisma/client";
import {
   useCartItem,
   useCurrency,
   useHandleModal,
   useWhicIsOpen,
} from "../../utils/UniStore";
import { useState } from "react";
import { cn } from "@/utils/tailwindMerge";
const ItemModal = ({ item, tonPrice }: { item: Product; tonPrice: number }) => {
   const isOpen = useWhicIsOpen((state) => state.opened);
   const change = useCartItem((state) => state.add);
   const modalOpener = useHandleModal((state) => state.toogle);
   const currency = useCurrency((state) => state.currency);
   const priceOnCurrency =
      currency === "TMT"
         ? item.priceTMT
         : currency === "USDT"
         ? item.priceUSDT
         : Number((item.priceUSDT / tonPrice).toFixed(4));

   const currentColor = cn(
      currency === "TMT"
         ? "bg-tmtColor"
         : currency === "TON"
         ? "bg-tonColor"
         : "bg-usdtColor"
   );
   const [receiver, setReceiver] = useState<string>("");
   const boxDisplay = cn(isOpen === item.id ? "block" : "hidden");
   return (
      <div
         className={`${boxDisplay} bg-white w-[90%] rounded-b-lg p-2 items-center mx-auto`}
      >
         {/* input box */}
         <div
            className={`${currentColor} mx-auto p-1 rounded-lg flex items-center justify-between`}
         >
            <div className="text-gray-100 font-semibold text-lg">@</div>
            <div className="overflow-hidden px-1 flex-1">
               <input
                  type="text"
                  name="receiver"
                  id=""
                  className="border-none py-2 w-full outline-none bg-transparent text-gray-100 font-medium text-lg placeholder:text-gray-200/80 placeholder:text-base"
                  placeholder="username"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  autoComplete="off"
               />
            </div>
            <button
               disabled={receiver.length < 1}
               onClick={() => {
                  change({
                     id: item.id,
                     product:
                        item.name === "jtn"
                           ? "Jeton"
                           : item.name === "star"
                           ? "Ýyldyz"
                           : item.name === "tgprem"
                           ? "Tg Premium"
                           : item.name === "uc"
                           ? "UC"
                           : item.name,
                     amount: item.amount,
                     receiver: "@" + receiver,
                     currency: currency,
                     total:
                        currency === "TON"
                           ? parseFloat(priceOnCurrency.toFixed(4))
                           : Number(priceOnCurrency),
                  });
                  modalOpener();
                  setReceiver("");
               }}
               className={`${
                  receiver.length < 1 ? "hidden" : "block"
               } bg-white text-black px-4 py-2 rounded-lg ring-1 ring-blue`}
            >
               Al
            </button>
         </div>
      </div>
   );
};

export default ItemModal;
