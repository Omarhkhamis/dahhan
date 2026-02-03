import { NextResponse } from "next/server";
import { isAuthed } from "../../../../lib/auth";
import { execute, query } from "../../../../lib/db";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  const rows = await query(
    `SELECT eid, email, dt_create FROM subscribe_emails ORDER BY dt_create DESC LIMIT 500`
  );
  return NextResponse.json({ ok: true, rows });
}

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await request.json();
  if (body.addEmail) {
    await execute(`INSERT INTO subscribe_emails (email, dt_create) VALUES (?, NOW())`, [body.addEmail]);
  }
  if (body.deleteId) {
    await execute(`DELETE FROM subscribe_emails WHERE eid = ?`, [body.deleteId]);
  }
  return NextResponse.json({ ok: true });
}
