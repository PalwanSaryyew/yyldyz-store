import { webApp } from "@/lib/webApp";
import { cn } from "@/utils/tailwindMerge";
import { CartItemState, useHandleModal, useUser } from "@/utils/UniStore";
import { useState } from "react";

const TmtUsdt = ({
   item,
   currency,
   moadalCloserButt,
}: {
   item: CartItemState["item"];
   currency: string;
   moadalCloserButt: (loading: boolean) => void;
}) => {
   const [loading, setLoading] = useState(false);
   const tmtClass = cn(
      loading ? `bg-tmtColor/50` : `bg-tmtColor`,
      `ring-orange-700`
   );
   const usdtClass = cn(
      loading ? `bg-usdtColor/50` : `bg-usdtColor`,
      `ring-green-700`
   );
   const user = useUser((state) => state.user);
   const toogleModal = useHandleModal((state) => state.toogle);

   async function handleClick() {
      setLoading(true);
      moadalCloserButt(true);

      const app = await webApp();
      app.requestWriteAccess(async (perm) => {
         if (perm) {
            await fetch(
               `/api/order?pid=${item?.id}&bid=${user?.id}&bsrnm=${user?.username}&rsrnm=${item?.receiver}&crrnc=${item?.currency}`
            )
               .then(async (response) => await response.json())
               .then(async (data) => {
                  if (data.success) {
                     toogleModal();
                     app.showAlert(
                        "Sargyt maglumatlary bot chatyna ugradyldy",
                        () => {
                           app.openTelegramLink(
                              "https://t.me/officialstarstorebot"
                           );
                           app.close();
                        }
                     );
                  } else {
                     toogleModal();
                     if (app.initData) {
                        app.showAlert("Yalnyslyk doredi \n " + data.message);
                     } else {
                        alert(data.message);
                     }
                  }
               })
               .finally(() => {
                  setLoading(false);
                  moadalCloserButt(false);
               });
         } else {
            toogleModal();
         }
      });
   }
   return (
      <button
         disabled={loading}
         onClick={handleClick}
         className={cn(
            "ring-inherit ring-2 w-full py-2 text-white rounded-lg flex items-center justify-center ",
            currency === "TMT" ? tmtClass : usdtClass
         )}
      >
         {loading ? "Garasyn..." : "Tassykla"}
      </button>
   );
};

export default TmtUsdt;
