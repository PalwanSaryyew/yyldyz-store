import React from "react";

interface WalletConnHandButtProps {
   title: string;
   handlerFunc?: () => void;
   isDisabled?: boolean;
}
const WalletConnHandButt: React.FC<WalletConnHandButtProps> = ({
   title,
   handlerFunc,
   isDisabled,
}) => {
   return (
      <button
         className="bg-blue-500 text-white p-1 px-2 font-bold rounded-3xl ring-2 ring-white"
         onClick={handlerFunc}
         disabled={isDisabled}
      >
         {title}
      </button>
   );
};

export default WalletConnHandButt;
