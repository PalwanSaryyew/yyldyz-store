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
   const receiverAddress = 'UQDi3J28_M_iFFZ9IiukdK7adLkY5SXiMUgWFMFZNAktkDsO'

   const handleClick = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/order?pid=${item.id}&bid=${user.id}&bsrnm=${user.username}&rsrnm=${item.receiver}&crrnc=${item.currency}`
        );
        if (!response.ok) {
          const errorData = await response.json(); // Try to get error details from the server
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    
        if (data.success) {
          const body = beginCell()
            .storeUint(0, 32)
            .storeStringTail(data.tonComment)
            .endCell();
    
          const transaction: SendTransactionRequest = {
            validUntil: Date.now() + 15 * 60 * 1000,
            messages: [
              {
                address: receiverAddress, // Use receiver address from item!
                amount: toNano(data.price).toString(),
                payload: body.toBoc().toString("base64"),
              },
            ],
          };
    
          const sendTran = async (tonConnectUI: ReturnType<typeof useTonConnectUI>[0]) => {
            try {
              const transactionResult = await tonConnectUI.sendTransaction(transaction);
              console.log("Transaction sent:", transactionResult);
              // Handle transaction confirmation/status here
              alert("Toleg amala asyryldy!"); // Success message in Turkmen
            } catch (transactionError: unknown) {
              console.error("Transaction error:", transactionError);
              alert("Tölegde ýalňyşlyk ýüze çykdy: " + (transactionError as Error).message); // More specific error message
            }
          };
    
          await sendTran(tonConnectUI); // Use await here
        } else {
          alert("Sargytda ýalňyşlyk ýüze çykdy: " + data.message); // More specific error message
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        alert("Sargytda ýalňyşlyk ýüze çykdy: " + (error as Error).message); // Display error message to the user
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
            isLoading ? "bg-blue-600/50" : "bg-blue-600"
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
