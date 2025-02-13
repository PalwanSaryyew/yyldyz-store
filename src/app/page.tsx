
import { prisma } from "../../prisma/prismaSett";
import MainboxColor from "@/components/MainboxColor";
import CurrencyBox from "@/components/CurrencyBox";
import StoreBox from "@/components/StoreBox";

export default async function Home() {
   const starsData = await prisma.star.findMany();
   return (
      <MainboxColor>
         <CurrencyBox />
         <StoreBox starsData={starsData} />
      </MainboxColor>
   );
}
