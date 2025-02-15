"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TelegramAuth() {
   useEffect(() => {
      authenticateUser();
   }, []);
   const router = useRouter();
   const authenticateUser = async () => {
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp.ready();
      const initData = WebApp.initData;
      console.log("initdata", initData);

      if (initData) {
         try {
            const response = await fetch("/api/auth", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ initData }),
            });

            if (response.ok) {
               router.push("/");
            }
         } catch (error) {
            console.log("[not telegram]", error);
            router.push("/error");
         }
      } else {
         router.push("/error");
      }
   };

   return (
      <div className="flex items-center justify-center w-screen h-screen">
         Loading...
      </div>
   );
}
