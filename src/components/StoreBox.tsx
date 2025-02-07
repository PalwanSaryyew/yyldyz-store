import { cmcApi } from "@/lib/fetchs";
import ItemBox from "./item/ItemBox";
import { Star } from "@prisma/client";

type StoreBoxProps = {
   starsData: Star[];
};
const StoreBox = async ({ starsData }: StoreBoxProps) => {
   const tonPrice = await cmcApi()
   return (
      <div className="flex flex-col gap-4 py-8 w-full items-center">
         {starsData.map((item) => (
            <ItemBox item={item} key={item.id} tonPrice={tonPrice}/>
         ))}
      </div>
   );
};

export default StoreBox;
