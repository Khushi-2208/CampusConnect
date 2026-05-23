import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export interface AuthUser {
  userId: number;
  email: string;
}

function readBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header) return null;

  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;

  return token;
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const bearerToken = readBearerToken(request);
  const cookieToken = request.cookies.get("auth-token")?.value ?? null;
  const token = bearerToken ?? cookieToken;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return payload;
}

export function requireAuth(request: NextRequest) {
  const user = getAuthUser(request);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
