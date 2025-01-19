import { toNano } from "@ton/core";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";

const transaction: SendTransactionRequest = {
   validUntil: Math.floor(Date.now() / 1000) + 360,
   messages: [
      {
         address: "UQDi3J28_M_iFFZ9IiukdK7adLkY5SXiMUgWFMFZNAktkDsO",
         amount: toNano("0.1").toString(),
      },
   ],
};

export const Sending = () => {
   const [tonConnectUI, setOptions] = useTonConnectUI();

   return (
      <div>
         <button
            className=""
            onClick={() => tonConnectUI.sendTransaction(transaction)}
         >
            Send transaction
         </button>
      </div>
   );
};
