"use client";
import { FaStar } from "react-icons/fa";
import { useHandleModal } from "./store/UniStore";

interface ItemBoxProps {
   id: number;
   quantity: number;
   price: number;
   currency: string;
   isOpen: number;
   tonPrice: number;
   chIsOpen: (isOpen: number) => void;
}

const ItemBox = ({
   id,
   quantity,
   price,
   currency,
   isOpen,
   chIsOpen,
   tonPrice,
}: ItemBoxProps) => {
   const open = isOpen;

   const currentColor =
      currency === "TMT" ? "green" : currency === "TON" ? "blue" : "orange";

   const modalOpener = useHandleModal((state) => state.toogle);

   return (
      <div className="w-full">
         {/*  info */}
         <div
            className="bg-white flex w-[90%] rounded-t-lg p-2 items-center justify-between mx-auto"
            onClick={() => {
               chIsOpen(open === id ? 0 : id);
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
                  {quantity}
               </div>
            </div>

            {/* right */}
            <div className="flex items-center gap-4">
               {/* price */}
               <div className="text-lg font-semibold text-gray-600">
                  {currency === "TON" ? (price / tonPrice).toFixed(4) : price}
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
               open === id ? "block" : "hidden"
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
                  onClick={() => modalOpener()}
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
