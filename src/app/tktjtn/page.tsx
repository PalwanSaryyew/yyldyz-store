import ItemBox from "@/components/item/ItemBox";
import { prisma } from "../../../prisma/prismaSett";

const Page = async () => {
   const data = await prisma.product.findMany({
      where: {
         name: "jtn",
      },
   });
   return (
      <div className="flex flex-col gap-4 py-8 w-full items-center">
         {data.map((item) => (
            <ItemBox item={item} key={item.id} tonPrice={0} />
         ))}
      </div>
   );
};
export default Page;
