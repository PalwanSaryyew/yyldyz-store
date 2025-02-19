"use client";
import { useCartItem, useUser } from "@/useStore/UniStore";
import { beginCell, toNano } from "@ton/ton";
import {
   SendTransactionRequest,
   useTonAddress,
   useTonConnectUI,
} from "@tonconnect/ui-react";
import { useState } from "react";

const Transactions = () => {
   const [tonConnectUI /* setOptions */] = useTonConnectUI();
   const rawAddress = useTonAddress(false);
   const item = useCartItem((state) => state.item);
   const user = useUser((state) => state.user);
   const [isLoading, setIsLoading] = useState(false);

   const handleClick = async () => {
      setIsLoading(true);
      await fetch(
         `/api/order?pid=${item.id}&bid=${user.id}&bsrnm=${user.username}&rsrnm=${item.receiver}&crrnc=${item.currency}`
      )
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
               const body = beginCell()
                  .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
                  .storeStringTail(data.tonComment) // write our text comment
                  .endCell();
               const transaction: SendTransactionRequest = {
                  validUntil: Date.now() + 15 * 60 * 1000, // 15 minutes
                  messages: [
                     {
                        address:
                           "UQDi3J28_M_iFFZ9IiukdK7adLkY5SXiMUgWFMFZNAktkDsO", // message destination in user-friendly format
                        amount: toNano(data.price).toString(),
                        payload: body.toBoc().toString("base64"),
                     },
                  ],
               };
               const sendTran = (
                  tonConnectUI: ReturnType<typeof useTonConnectUI>[0]
               ) => {
                  tonConnectUI.sendTransaction(transaction);
               };
               sendTran(tonConnectUI);
            } else {
               alert("Yalnyslyk doredi");
            }
         })
         .finally(() => {
            setIsLoading(false);
         });
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
            isLoading ? "bg-blue-500/50" : "bg-blue-500"
         } w-full py-2 text-white rounded-lg ring-inherit ring-2 ring-blue-400 flex items-center justify-center`}
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
