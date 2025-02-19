"use client";
import { getUserInfo } from "@/lib/userinfo";
import { useUser } from "@/useStore/UniStore";
import Image from "next/image";
import { useEffect } from "react";

const User = () => {
   const setUserState = useUser((state) => state.add);
   const getUserState = useUser((state) => state.user);
   /* interface UserType {
      id: string;
      photo_url: string;
      username: string;
   } */

   useEffect(() => {
      const getAll = async () => {
         const tgInfo = await getUserInfo();
         console.log(tgInfo);

         if (tgInfo) {
            setUserState({
               id: String(tgInfo.id) || "0",
               photo_url: tgInfo.photo_url || "/emeki.png",
               username: tgInfo.username || "Unknown User",
            });
         }
      };
      getAll();
   }, [setUserState]);

   return (
      <div className="bg-blue-500 text-white p-1 font-bold rounded-3xl flex items-center gap-1 ring-2 ring-white">
         <Image
            alt=""
            src={getUserState?.photo_url || "/no-user.png"}
            width={50}
            height={50}
            className="rounded-full"
         />
         <span>{getUserState ? getUserState.username : "username"}</span>
      </div>
   );
};

export default User;
