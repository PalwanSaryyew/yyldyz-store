import MyTonProvider from "../ton/TonProvider";
import Wallet from "../ton/Wallet";
import User from "../telegram/User";

const Footer = () => {
   return (
      <footer className="fixed bottom-0 bg-blue-300 w-full flex justify-between pt-5 pb-4 px-8 rounded-t-[3rem]">
         <User />
         <MyTonProvider>
            <Wallet />
         </MyTonProvider>
      </footer>
   );
};

export default Footer;
