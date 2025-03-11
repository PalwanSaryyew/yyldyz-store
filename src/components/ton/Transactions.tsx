"use client";
import { ourTonAddress } from "@/lib/settings";
import { webApp } from "@/lib/webApp";
import { useCartItem, useHandleModal, useUser } from "@/utils/UniStore";
import { beginCell, toNano } from "@ton/ton";
import {
   SendTransactionRequest,
   useTonAddress,
   useTonConnectUI,
} from "@tonconnect/ui-react";
import { useState } from "react";

const Transactions = () => {
   const [tonConnectUI] = useTonConnectUI();
   const rawAddress = useTonAddress(false);
   const item = useCartItem((state) => state.item);
   const user = useUser((state) => state.user);
   const toogleModal = useHandleModal((state) => state.toogle);
   const [isLoading, setIsLoading] = useState(false);

   const handleClick = async () => {
      setIsLoading(true);
      const app = await webApp();
      try {
         const response = await fetch(
            `/api/order?pid=${item?.id}&bid=${user?.id}&bsrnm=${user?.username}&rsrnm=${item?.receiver}&crrnc=${item?.currency}`
         ).then(async (response) => await response.json());

         if (response.success) {
            const body = beginCell()
               .storeUint(0, 32)
               .storeStringTail(response.tonComment)
               .endCell();
            const transaction: SendTransactionRequest = {
               validUntil: Date.now() + 15 * 60 * 1000,
               messages: [
                  {
                     address: ourTonAddress, // Use receiver address
                     amount: toNano(response.price).toString(),
                     payload: body.toBoc().toString("base64"),
                  },
               ],
            };

            const sendTran = async (
               tonConnectUI: ReturnType<typeof useTonConnectUI>[0]
            ) => {
               try {
                  const transactionResult = await tonConnectUI.sendTransaction(
                     transaction
                  );
                  toogleModal();
                  await fetch(
                     `/api/transaction?trnsctn=${transactionResult}&bid=${user?.id}&s=1&oi=${response.orderId}`
                  );
                  app.showAlert("Toleg amala asyryldy!", () => {
                  app.openTelegramLink("https://t.me/officialstarstorebot");
                  }); // Success message
               } catch (transactionError: unknown) {
                  toogleModal();
                  await fetch(
                     `/api/transaction?trnsctn=${transactionError}&bid=${user?.id}&s=0`
                  );
                  app.showAlert("Tölegde ýalňyşlyk ýüze çykdy");
               }
            };

            await sendTran(tonConnectUI); // Use await here
         } else {
            app.showAlert(response.message); // More specific error message
         }
      } catch (error) {
         app.showAlert("fetching error " + error); // Display error message to the user
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <button
         disabled={isLoading}
         onClick={() => {
            if (rawAddress) {
               handleClick();
            } else if (!rawAddress) {
               tonConnectUI.openModal();
            } else {
            }
         }}
         className={`${
            isLoading ? "bg-tonColor/50 cursor-wait" : "bg-tonColor"
         } w-full py-2 text-white rounded-lg ring-inherit ring-2 ring-blue-800 flex items-center justify-center`}
      >
         {!rawAddress
            ? "Connect Wallet"
            : isLoading
            ? "Loading..."
            : "Send transaction"}
      </button>
   );
};

export default Transactions;
