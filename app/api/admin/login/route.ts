import { NextResponse } from "next/server";
import { z } from "zod";
import { getConfig } from "../../../../lib/content";
import { createSession, setSessionCookie } from "../../../../lib/auth";

const schema = z.object({ password: z.string().min(3) });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const config = await getConfig();
    if (data.password !== config.pass) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const token = createSession();
    setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Error" }, { status: 400 });
  }
}
