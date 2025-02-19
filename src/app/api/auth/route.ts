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
         
      };

      // Create a new session
      const expires = new Date(Date.now() + SESSION_DURATION);
      const session = await encrypt({ user, expires });

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
