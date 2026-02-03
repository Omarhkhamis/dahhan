import { NextResponse } from "next/server";
import { z } from "zod";
import { execute } from "../../../../lib/db";
import { sendConsultationEmail } from "../../../../lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await execute(
      `INSERT INTO customer_msgs (cname, phone, email, title, msg_text, dt_create)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [data.name, data.phone, data.email || null, "Free consultation", "",]
    );

    await sendConsultationEmail({
      to: "info@dahhandent.com",
      name: data.name,
      email: data.email || "",
      phone: data.phone
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Error" }, { status: 400 });
  }
}
