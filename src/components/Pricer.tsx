"use client";
import { useCoinPrice } from "../useStore/UniStore";

const Pricer = ({ coin }: { coin: string }) => {
   const price = useCoinPrice((state) => state.price);
   const change = useCoinPrice((state) => state.priceChanger);
   change({ coin: coin, price, priceChanger: change }); // Assuming CoinPriceState has properties 'coin', 'price', and 'priceChanger'
   return (
      <>
         {/* {Math.round(price * 100) / 100} */}
         {price.toFixed(2)}
      </>
   );
};

export default Pricer;
