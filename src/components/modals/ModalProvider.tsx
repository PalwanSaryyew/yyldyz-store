import Transactions from "@/ton/Transactions";
import ChktMdl from "./ChktMdl";

const ModalProvider = () => {
   return (
      <ChktMdl>
            <Transactions />
      </ChktMdl>
   );
};

export default ModalProvider;
