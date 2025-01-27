"use client";
import { beginCell, toNano } from "@ton/ton";
import {
   SendTransactionRequest,
   useTonAddress,
   useTonConnectUI,
} from "@tonconnect/ui-react";

const Transactions = ({amount}: {amount: number}) => {
   const [tonConnectUI /* setOptions */] = useTonConnectUI();
   const rawAddress = useTonAddress(false);
   const body = beginCell()
      .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
      .storeStringTail("This is an ton comment") // write our text comment
      .endCell();
   const transaction: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
      messages: [
         {
            address: "UQDi3J28_M_iFFZ9IiukdK7adLkY5SXiMUgWFMFZNAktkDsO", // message destination in user-friendly format
            amount: toNano(amount.toString()).toString(),
            payload: body.toBoc().toString("base64"),
         },
      ],
   };

   const sendTran = (tonConnectUI: ReturnType<typeof useTonConnectUI>[0]) => {
      tonConnectUI.sendTransaction(transaction);
   };

   if (!rawAddress) return null;
   return (
      <button onClick={() => sendTran(tonConnectUI)}>Send transaction</button>
   );
};

export default Transactions;
