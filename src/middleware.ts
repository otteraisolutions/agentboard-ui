import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/cookies";

export function middleware(request: NextRequest) {
  const hasSession = Boolean(
    request.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? request.cookies.get(REFRESH_TOKEN_COOKIE)?.value,
  );

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Excluye tambien archivos estaticos (logo.jpg, icon.jpg del favicon, etc.) -
  // sin esto, el logo de la pantalla de login quedaba bloqueado por el redirect
  // antes de poder autenticarse.
  matcher: [
    "/((?!login|forgot-password|reset-password|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|ico|webp)$).*)",
  ],
};
