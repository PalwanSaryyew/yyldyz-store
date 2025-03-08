"use client";
import { webApp } from "@/lib/webApp";
import { useUser } from "@/utils/UniStore";
import Image from "next/image";
import { useEffect } from "react";

const User = () => {
   const setUserState = useUser((state) => state.add);
   const getUserState = useUser((state) => state.user);

   useEffect(() => {
      const getAll = async () => {
         const { initDataUnsafe } = await webApp();
         const { user } = initDataUnsafe;

         if (user) {
            setUserState({
               id: user.id,
               photo_url: user.photo_url || "/oth/no-user.png",
               username: user.username || "username",
            });
         }
      };
      getAll();
   }, [setUserState]);

   return (
      <div className="bg-blue-500 text-white p-1 font-bold rounded-3xl flex items-center gap-1 ring-2 ring-white">
         <Image
            alt=""
            src={getUserState?.photo_url || "/oth/no-user.png"}
            width={40}
            height={40}
            className="rounded-full"
         />
         <span>{getUserState ? getUserState.username : "username"}</span>
      </div>
   );
};

export default User;
