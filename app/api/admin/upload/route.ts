import { NextResponse } from "next/server";
import { isAuthed } from "../../../../lib/auth";
import path from "path";
import { promises as fs } from "fs";

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".bin";
  const name = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, name), buffer);

  return NextResponse.json({ ok: true, path: `/uploads/${name}` });
}
