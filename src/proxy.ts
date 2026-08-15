import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("aiflow_session")?.value;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Dashboard requires authentication
  if (isDashboardRoute && !session) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};