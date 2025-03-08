"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { tgprem, tgstar, tktkjtn, uc } from "@/lib/settings";
const ItemIcon = () => {
   const currentPath = usePathname();

   return (
      <Image
         src={
            currentPath === tgprem
               ? "/jtns/tgprem.png"
               : currentPath === tktkjtn
               ? "/jtns/tktjtn.svg"
               : currentPath === tgstar
               ? "/jtns/tgstar.png"
               : currentPath === uc
               ? "/jtns/uc.png"
               : ""
         }
         width={28}
         height={28}
         alt=""
      />
   );
};

export default ItemIcon;
