import { NextResponse } from "next/server";

// ✅ Protected routes list
const protectedRoutes = ["/challenges", "/compete", "/profile","/scoreboard"];

export function middleware(req) {
  const userCookie = req.cookies.get("user"); // yahi aapne set kiya tha
  const path = req.nextUrl.pathname;

  // Agar route protected hai aur cookie nahi mili to redirect
  if (protectedRoutes.some((route) => path.startsWith(route)) && !userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ✅ Matcher config
export const config = {
  matcher: ["/challenges/:path*", "/compete/:path*", "/profile/:path*","/scoreboard/:path*"],
};
