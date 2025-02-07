import Transactions from "@/ton/Transactions";
import ChktMdl from "./ChktMdl";

const ModalProvider = () => {
   return (
      <ChktMdl>
         <div className="bg-blue-500 mt-3 mx-1 py-2 text-white rounded-lg ring-inherit ring-2 ring-blue-400 flex items-center justify-center">
            <Transactions />
         </div>
      </ChktMdl>
   );
};

export default ModalProvider;
