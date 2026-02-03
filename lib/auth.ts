import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function getSecret() {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) throw new Error("ADMIN_COOKIE_SECRET is not set");
  return secret;
}

export function createSession() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = JSON.stringify({ exp });
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return Buffer.from(payload).toString("base64url") + "." + signature;
}

export function verifySession(token: string | undefined) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const payload = Buffer.from(parts[0], "base64url").toString("utf-8");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  if (signature !== parts[1]) return false;
  try {
    const data = JSON.parse(payload);
    if (!data.exp || Date.now() / 1000 > data.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}

export function isAuthed() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySession(token);
}

export const sessionConfig = {
  cookieName: COOKIE_NAME,
  maxAgeSeconds: MAX_AGE_SECONDS
};
