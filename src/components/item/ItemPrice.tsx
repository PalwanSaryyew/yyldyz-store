"use client";
import { useCurrency } from "@/useStore/UniStore";

interface ItemPriceProps {
   priceTMT: number;
   priceUSDT: number;
   tonPrice: number;
}

const ItemPrice = ({ priceTMT, priceUSDT, tonPrice }: ItemPriceProps) => {
   const currency = useCurrency((state) => state.currency);
   const priceOnCurrency =
      currency === "TMT"
         ? priceTMT
         : currency === "USDT"
         ? priceUSDT
         : Number((priceUSDT / tonPrice).toFixed(4));
   return (
      <div className="text-lg font-semibold text-gray-600">
         {priceOnCurrency}
      </div>
   );
};

export default ItemPrice;
