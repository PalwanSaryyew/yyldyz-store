import { CartItemState, useHandleModal, useUser } from "@/useStore/UniStore";
import { useState } from "react";

const TmtUsdt = ({
   item,
   currency,
}: {
   item: CartItemState["item"];
   currency: string;
}) => {
   const [loading, setLoading] = useState(false);
   const tmtClass = loading ? "bg-green-500/50" : "bg-green-500";
   const usdtClass = loading ? "bg-orange-500/50" : "bg-orange-500";
   const user = useUser((state) => state.user);
   const modal = useHandleModal((state) => state.toogle);
   const handleClick = async () => {
      setLoading(true);
      await fetch(
         `/api/order?pid=${item.id}&bid=${user.id}&bsrnm=${user.username}&rsrnm=${item.receiver}&crrnc=${item.currency}`
      )
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
               modal();
               alert("Sargyt kabul edilyanca garasyn");
            } else {
               modal();
               alert("Yalnyslyk doredi");
            }
         });
   };
   return (
      <button
         disabled={loading}
         onClick={handleClick}
         className={`${
            currency === "TMT" ? tmtClass : usdtClass
         } w-full py-2 text-white rounded-lg ring-inherit ring-2 ring-green-600 flex items-center justify-center`}
      >
         {loading ? "loading..." : "Tassykla"}
      </button>
   );
};

export default TmtUsdt;
