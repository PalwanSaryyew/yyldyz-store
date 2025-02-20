import { webApp } from "@/lib/webApp";
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
   const tmtClass = loading
      ? "bg-green-600/50 ring-green-700"
      : "bg-green-600 ring-green-700";
   const usdtClass = loading
      ? "bg-orange-600/50 ring-orange-700"
      : "bg-orange-600 ring-orange-700";
   const user = useUser((state) => state.user);
   const modal = useHandleModal((state) => state.toogle);
   const handleClick = async () => {
      setLoading(true);
      await fetch(
         `/api/order?pid=${item.id}&bid=${user.id}&bsrnm=${user.username}&rsrnm=${item.receiver}&crrnc=${item.currency}`
      )
         .then((response) => response.json())
         .then(async (data) => {
            const app = await webApp();
            if (data.success) {
               modal();
               app.showAlert("Sargyt kabul edilyanca garasyn");
            } else {
               modal();
               app.showAlert("Yalnyslyk doredi");
            }
         });
   };
   return (
      <button
         disabled={loading}
         onClick={handleClick}
         className={`${
            currency === "TMT" ? tmtClass : usdtClass
         } ring-green-700 w-full py-2 text-white rounded-lg ring-inherit ring-2 flex items-center justify-center`}
      >
         {loading ? "loading..." : "Tassykla"}
      </button>
   );
};

export default TmtUsdt;
