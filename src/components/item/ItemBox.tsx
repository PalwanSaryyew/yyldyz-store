import { FaStar } from "react-icons/fa";
import { Star } from "@prisma/client";
import ItemModal from "./ItemModal";

import ItemModalOpener from "./ItemModalOpener";
import ItemCurrency from "./ItemCurrency";
import ItemPrice from "./ItemPrice";
interface ItemBoxProps {
   item: Star;
   tonPrice: number;
}

const ItemBox = ({ item, tonPrice }: ItemBoxProps) => {
   return (
      <div className="w-full">
         {/*  info */}
         <ItemModalOpener id={item.id}>
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
               <ItemPrice
                  tonPrice={tonPrice}
                  priceTMT={item.priceTMT}
                  priceUSDT={item.priceUSDT}
               />

               {/* currency */}
               <ItemCurrency />
            </div>
         </ItemModalOpener>

         {/* openable bottom section */}
         <ItemModal item={item} tonPrice={tonPrice} />
      </div>
   );
};

export default ItemBox;
