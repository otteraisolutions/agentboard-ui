import { NextResponse } from "next/server";

export const ACCESS_TOKEN_COOKIE = "ab_access_token";
export const REFRESH_TOKEN_COOKIE = "ab_refresh_token";

const REFRESH_TOKEN_MAX_AGE_SECONDS = Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? "14") * 24 * 60 * 60;

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setSessionCookies(response: NextResponse, accessToken: string, refreshToken: string, expiresInSeconds: number) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...baseCookieOptions,
    maxAge: expiresInSeconds,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", { ...baseCookieOptions, maxAge: 0 });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", { ...baseCookieOptions, maxAge: 0 });
}
