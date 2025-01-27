import User from "../telegram/User";
import WallConnHandler from "@/ton/WallConnHandler";

const Footer = () => {
   return (
      <footer className="fixed bottom-0 bg-blue-300 w-full flex justify-between pt-5 pb-4 px-8 rounded-t-[3rem]">
         <User />
         <WallConnHandler />
      </footer>
   );
};

export default Footer;
