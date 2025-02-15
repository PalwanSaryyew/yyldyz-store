import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./utils/session";

export async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;

   if (pathname === "/admin") {
      const session = await getSession();
      console.log('session is: ',session);
      
      
      if (session === null) {
         return NextResponse.redirect(new URL("/login", request.url));
      }
   }
   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|login|error).*)"],
};
