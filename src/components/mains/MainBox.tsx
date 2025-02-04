import { prisma } from "../../../prisma/prismaSett";
import CurrencyBox from "../CurrencyBox";
import MainboxColor from "../MainboxColor";
import StoreBox from "../StoreBox";
const MainBox = async ({tonPrice}: {tonPrice: number}) => {
   const starsData = await prisma.star.findMany()
   return (
      <MainboxColor>
         <CurrencyBox />
         <StoreBox starsData={starsData} tonPrice={tonPrice}/>
      </MainboxColor>
   );
};

export default MainBox;
