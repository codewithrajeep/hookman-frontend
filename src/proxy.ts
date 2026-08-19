import { NextRequest, NextResponse } from "next/server";

// public routes that doesn't require authentication
const PUBLIC_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  // check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  // check if the routes start with /dashboard (all dashboard routes are private)
  const isDashboardRoute = pathname.startsWith("/dashboard");
  // if no token and trying to access dashboard -> redirect to login
  if (!token && isDashboardRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  //   if token exist and trying to access public route -> redirect to dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  //   allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // all dashboard routes are private
    "/login",
    "/register",
  ],
};
