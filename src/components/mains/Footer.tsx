import User from "../telegram/User";
import WallConnHandler from "@/ton/WallConnHandler";

const Footer = () => {
   return (
      <footer className="fixed bottom-0 bg-blue-400 w-full flex justify-between py-3 px-8 rounded-t-[3rem]">
         <User />
         <WallConnHandler />
      </footer>
   );
};

export default Footer;
