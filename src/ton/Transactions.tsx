"use client";
import { useCartItem } from "@/useStore/UniStore";
import { beginCell, toNano } from "@ton/ton";
import {
   SendTransactionRequest,
   useTonAddress,
   useTonConnectUI,
} from "@tonconnect/ui-react";

const Transactions = () => {
   const [tonConnectUI /* setOptions */] = useTonConnectUI();
   const rawAddress = useTonAddress(false);
   const item = useCartItem((state) => state.item);

   const handleClick = async () => {
      await fetch(`/api/transactions?id=${item.id}&user=${'tester'}`)
         .then((response) => response.json())
         .then((data) => {
            console.log("data", data);
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
         })
         .catch((error) => {
            throw new Error(`HTTP error! status: ${error.message}`);
         });
   };

   if (!rawAddress)
      return (
         <button onClick={() => tonConnectUI.openModal()}>
            Connect Wallet
         </button>
      );
   return <button onClick={handleClick}>Send transaction</button>;
};

export default Transactions;
