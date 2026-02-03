import { NextResponse } from "next/server";
import { z } from "zod";
import { execute } from "../../../../lib/db";

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    await execute(
      `INSERT INTO subscribe_emails (email, dt_create) VALUES (?, NOW())`,
      [data.email]
    );
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Error" }, { status: 400 });
  }
}
