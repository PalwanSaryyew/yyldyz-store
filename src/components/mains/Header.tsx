import { LuAlignRight } from "react-icons/lu";
import Pricer from "../Pricer";
const Header = () => {
   return (
      <header className="z-10 bg-blue-400 flex justify-between items-center px-4 py-1 rounded-b-3xl sticky top-0">
         {/* left */}
         <h1 className="font-semibold cursor-pointer rounded-full p-[2px] bg-gradient-to-r from-orange-500 via-green-500 to-blue-500">
            <div className="bg-white rounded-full p-1 px-2">
               <span className="bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 bg-clip-text text-transparent text-lg">
                  Ýyldyz Store
               </span>
            </div>
         </h1>
         {/* mid */}
         <div className="text-white font-black">
            TON: <Pricer round={2} />
         </div>
         {/* right */}
         <div className="cursor-pointer">
            <LuAlignRight size={45} color="white" />
         </div>
      </header>
   );
};

export default Header;
