'use client'
import {
   useIsConnectionRestored,
   useTonAddress,
   useTonConnectUI,
} from "@tonconnect/ui-react";
import WalletConnHandButt from "./WalletConnHandButt";

const WallConnHandler = () => {
   const [tonConnectUI /* setOptions */] = useTonConnectUI();
   const connectionRestored = useIsConnectionRestored();
   const rawAddress = useTonAddress(false);
   const userFriendlyAddress = useTonAddress();
   const formatAddress = () => {
      if (!rawAddress) {
         return '';
      }
      return `${userFriendlyAddress.slice(0, 4)}...${userFriendlyAddress.slice(-4)}`;
   };

   return (
      <>
         {!connectionRestored ? (
            <WalletConnHandButt isDisabled={true} title={"loading..."} />
         ) : rawAddress ? (
            <WalletConnHandButt
               title={formatAddress()}
               handlerFunc={() => tonConnectUI.disconnect()}
            />
         ) : (
            <WalletConnHandButt
               title="Connect"
               handlerFunc={() => tonConnectUI.openModal()}
            />
         )}
      </>
   );
};

export default WallConnHandler;
