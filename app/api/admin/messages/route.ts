import { NextResponse } from "next/server";
import { isAuthed } from "../../../../lib/auth";
import { execute, query } from "../../../../lib/db";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  const rows = await query(
    `SELECT eid, cname, phone, email, title, msg_text, dt_create
     FROM customer_msgs
     ORDER BY dt_create DESC
     LIMIT 200`
  );
  return NextResponse.json({ ok: true, rows });
}

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await request.json();
  if (body.deleteId) {
    await execute(`DELETE FROM customer_msgs WHERE eid = ?`, [body.deleteId]);
  }
  return NextResponse.json({ ok: true });
}
