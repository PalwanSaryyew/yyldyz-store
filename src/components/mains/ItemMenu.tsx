"use client";
import { cn } from "@/utils/tailwindMerge";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ItemMenu = () => {
   const currentPath = usePathname();

   return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-10 flex flex-col backdrop-blur-[4px] rounded-s-lg overflow-hidden divide-y divide-mainColor px-1 border-2 border-r-0 border-mainColor">
         <Link href={"/"}>
            <div
               className={cn(
                  currentPath === "/" ? "hidden" : "block",
                  "flex-1 bg-orange-30 p-1"
               )}
            >
               <Image src={"/jtns/tgstar.png"} alt="" width={35} height={35} />
            </div>
         </Link>
         <Link href={"/uc"}>
            <div
               className={cn(
                  currentPath === "/uc" ? "hidden" : "block",
                  "flex-1 bg-orange-30 p-1"
               )}
            >
               <Image src={"/jtns/uc.png"} alt="" width={35} height={35} />
            </div>
         </Link>
         <Link href={"/tktjtn"}>
            <div
               className={cn(
                  currentPath === "/tktjtn" ? "hidden" : "block",
                  "flex-1 bg-orange-30 p-1"
               )}
            >
               <Image src={"/jtns/tktjtn.svg"} alt="" width={35} height={35} />
            </div>
         </Link>
         <Link href={"/prem"}>
            <div
               className={cn(
                  currentPath === "/prem" ? "hidden" : "block",
                  "flex-1 bg-orange-30 p-1"
               )}
            >
               <Image src={"/jtns/tgprem.png"} alt="" width={35} height={35} />
            </div>
         </Link>
      </div>
   );
};

export default ItemMenu;
