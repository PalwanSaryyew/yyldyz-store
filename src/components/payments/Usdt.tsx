import { CartItemState, useHandleModal, useUser } from "@/useStore/UniStore";
import { useState } from "react";

const Usdt = ({ item }: { item: CartItemState["item"] }) => {
   const [loading, setLoading] = useState(false);

   const user = useUser((state) => state.user);
   const modal = useHandleModal((state) => state.toogle);
   const handleClick = async () => {
    setLoading(true)
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
            loading ? "bg-orange-500/50" : "bg-orange-500"
         } w-full py-2 text-white rounded-lg ring-inherit ring-2 ring-orange-600 flex items-center justify-center`}
      >
         {loading ? "loading..." : "Tassykla"}
      </button>
   );
};

export default Usdt;
