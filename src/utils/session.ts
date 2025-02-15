/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function encrypt(payload: any) {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function decrypt(input: string): Promise<any | null> {
   try {
      const { payload } = await jwtVerify(input, key, {
         algorithms: ["HS256"],
      });
      console.log(payload);
      if (payload) {
         return payload;
      }
      return null;
   } catch (e) {
      console.log("[Token verification failed]: ", e);
      return null;
   }
}

export async function getSession() {
   const session = cookies().get("mystoresession")?.value;
   if (!session) return null;
   const decrypted = await decrypt(session);
   return decrypted;
}

export async function updateSessionExprs(request: NextRequest) {
   const session = request.cookies.get("mystoresession")?.value;
   if (!session) return;

   // Refresh the session so it doesn't expire
   const parsed = await decrypt(session);
   parsed.expires = new Date(Date.now() + SESSION_DURATION);
   const res = NextResponse.next();
   res.cookies.set({
      name: "mystoresession",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
   });
   return res;
}
