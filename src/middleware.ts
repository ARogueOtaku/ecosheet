import { getUser } from "@/server/data-access/user";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/register"];

export default async function middleware(req: NextRequest) {
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const currentUser = await getUser();
  if (!isPublicRoute && !currentUser)
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  else if (isPublicRoute && currentUser)
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
