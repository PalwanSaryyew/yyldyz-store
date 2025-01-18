"use client";
interface CurrencyBoxProps {
   crChange: (color: string) => void;
}

const CurrencyBox = ({ crChange }: CurrencyBoxProps) => {
   return (
      <div className="w-full rounded-3xl flex text-white overflow-hidden font-bold">
         <div
            className={`flex-1 text-center py-2 bg-green-500`}
            onClick={() => {
               crChange("TMT");
            }}
         >
            TMT
         </div>
         <div
            className={`flex-1 text-center py-2 bg-orange-500`}
            onClick={() => {
               crChange("USDT");
            }}
         >
            USDT
         </div>
         <div
            className={`flex-1 text-center py-2 bg-blue-500`}
            onClick={() => {
               crChange("TON");
            }}
         >
            TON
         </div>
      </div>
   );
};

export default CurrencyBox;
