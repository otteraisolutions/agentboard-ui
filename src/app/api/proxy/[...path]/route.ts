import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, clearSessionCookies, setSessionCookies } from "@/lib/auth/cookies";

type RouteContext = { params: Promise<{ path: string[] }> };

const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

async function proxy(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const { path } = await context.params;
  const targetPath = `/api/${path.join("/")}${request.nextUrl.search}`;
  const body = BODYLESS_METHODS.has(request.method) ? undefined : await request.text();

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  let backendResponse = await backendFetch(targetPath, {
    method: request.method,
    body,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  let refreshedCookies: { accessToken: string; refreshToken: string; expiresIn: number } | null = null;

  if (backendResponse.status === 401) {
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
    if (refreshToken) {
      const refreshResponse = await backendFetch("/api/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        refreshedCookies = { accessToken: data.accessToken, refreshToken: data.refreshToken, expiresIn: data.expiresIn };
        backendResponse = await backendFetch(targetPath, {
          method: request.method,
          body,
          headers: { Authorization: `Bearer ${data.accessToken}` },
        });
      }
    }
  }

  const responseBody = await backendResponse.text();
  const response = new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: { "Content-Type": backendResponse.headers.get("content-type") ?? "application/json" },
  });

  if (refreshedCookies) {
    setSessionCookies(response, refreshedCookies.accessToken, refreshedCookies.refreshToken, refreshedCookies.expiresIn);
  } else if (backendResponse.status === 401) {
    clearSessionCookies(response);
  }

  return response;
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
