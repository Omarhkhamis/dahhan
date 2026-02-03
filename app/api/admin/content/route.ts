import { NextResponse } from "next/server";
import { isAuthed } from "../../../../lib/auth";
import { getConfig, getEndlessSmiles, getEndlessSmilesAdmin, getHomeData, setSubParagraphValue } from "../../../../lib/content";
import { execute, query } from "../../../../lib/db";
import { z } from "zod";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  const [config, home, smiles, smilesAdmin] = await Promise.all([
    getConfig(),
    getHomeData(),
    getEndlessSmiles(),
    getEndlessSmilesAdmin()
  ]);
  return NextResponse.json({ ok: true, config, home, smiles, smilesAdmin });
}

const updateSchema = z.object({
  updates: z.array(z.object({ internalName: z.string(), value: z.string() })).optional(),
  createGroup: z
    .object({
      textAr: z.string(),
      textEn: z.string(),
      before: z.string(),
      after: z.string()
    })
    .optional(),
  deleteGroup: z.string().optional()
});

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await request.json();
  const data = updateSchema.parse(body);

  if (data.updates) {
    for (const u of data.updates) {
      await setSubParagraphValue(u.internalName, u.value);
    }
  }

  if (data.createGroup) {
    const rows = await query<{ pid: number }>(
      `SELECT pid FROM ms_paragraphs WHERE internal_name = 'endless_smiles' LIMIT 1`
    );
    const paraId = rows[0]?.pid;
    if (!paraId) throw new Error("endless_smiles paragraph not found");
    const group = `es_photo_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const inserts = [
      {
        internal: `es_text_ar_${group.slice(-5)}`,
        arName: "النص بالعربي",
        enName: "",
        spType: 1,
        maxSize: 3000,
        param1: "ar_text,3",
        order: 1,
        contents: data.createGroup.textAr
      },
      {
        internal: `es_text_en_${group.slice(-5)}`,
        arName: "النص بالإنكليزي",
        enName: "",
        spType: 1,
        maxSize: 3000,
        param1: "en_text,4",
        order: 2,
        contents: data.createGroup.textEn
      },
      {
        internal: `es_photo_before_${group.slice(-5)}`,
        arName: "الصورة قبل",
        enName: "",
        spType: 2,
        maxSize: 3000000,
        param1: "image/*",
        order: 3,
        contents: data.createGroup.before
      },
      {
        internal: `es_photo_after_${group.slice(-5)}`,
        arName: "الصورة بعد",
        enName: "",
        spType: 2,
        maxSize: 3000000,
        param1: "image/*",
        order: 4,
        contents: data.createGroup.after
      }
    ];

    for (const item of inserts) {
      const result: any = await execute(
        `INSERT INTO ms_sub_paragraphs
          (fk_para_id, internal_name, ar_sub_para_name, en_sub_para_name, spType, max_size, param1, order_in_page, repeat_group_intrnl_name, repeat_group_view_name, is_pattern)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [
          paraId,
          item.internal,
          item.arName,
          item.enName,
          item.spType,
          item.maxSize,
          item.param1,
          item.order,
          group,
          "الفقرة"
        ]
      );
      await execute(`INSERT INTO ms_sub_para_elements (fk_sub_para_id, contents) VALUES (?, ?)`, [result.insertId, item.contents]);
    }
  }

  if (data.deleteGroup) {
    await execute(
      `DELETE e FROM ms_sub_para_elements e
       INNER JOIN ms_sub_paragraphs sp ON sp.spid = e.fk_sub_para_id
       WHERE sp.repeat_group_intrnl_name = ?`,
      [data.deleteGroup]
    );
    await execute(`DELETE FROM ms_sub_paragraphs WHERE repeat_group_intrnl_name = ?`, [data.deleteGroup]);
  }

  return NextResponse.json({ ok: true });
}
