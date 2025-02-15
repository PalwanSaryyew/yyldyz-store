import { NextResponse } from "next/server";
import { validateTelegramWebAppData } from "@/utils/telegramAuth";
import { cookies } from "next/headers";
import { encrypt, SESSION_DURATION } from "@/utils/session";
import { prisma } from "../../../../prisma/prismaSett";

export async function POST(request: Request) {
   const { initData } = await request.json();

   const validationResult = validateTelegramWebAppData(initData);

   if (validationResult.validatedData && validationResult.user) {
      console.log("[Validation result]: ", validationResult);
      const user = {
         id: validationResult.user.id.toString(),
         first_name: validationResult.user.first_name,
         last_name: validationResult.user.last_name,
         username: validationResult.user.username || "",
         language_code: validationResult.user.language_code,
         is_premium: validationResult.user?.is_premium ? true : false,
         allows_write_to_pm: validationResult.user.allows_write_to_pm,
         photo_url: validationResult.user.photo_url,
         auth_date: validationResult.validatedData.auth_date,
      };
      const payload = {
         id: validationResult.user.id.toString(),
         first_name: validationResult.user.first_name,
         last_name: validationResult.user.last_name,
         username: validationResult.user.username || "",
         language_code: validationResult.user.language_code,
         is_premium: validationResult.user?.is_premium ? true : false,
         photo_url: validationResult.user.photo_url,
      };

      // Create a new session
      const expires = new Date(Date.now() + SESSION_DURATION);
      const session = await encrypt({ payload, expires });

      // Save the session in a cookie
      await prisma.user.upsert({
         where: { id: user.id.toString() },
         update: user,
         create: user,
      });
      cookies().delete("mystoresession");
      cookies().set("mystoresession", session, { expires, httpOnly: true });

      return NextResponse.json({ message: "Authentication successful" });
   } else {
      return NextResponse.json(
         { message: validationResult.message },
         { status: 401 }
      );
   }
}
