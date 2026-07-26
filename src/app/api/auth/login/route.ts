import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setSessionCookies } from "@/lib/auth/cookies";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const backendResponse = await backendFetch("/api/auth/login", {
    method: "POST",
    body,
  });

  const data = await backendResponse.json();
  if (!backendResponse.ok) {
    return NextResponse.json(data, { status: backendResponse.status });
  }

  const response = NextResponse.json({ user: data.user });
  setSessionCookies(response, data.accessToken, data.refreshToken, data.expiresIn);
  return response;
}
