import { query, execute } from "./db";

export type SubParaRow = {
  spid: number;
  internal_name: string;
  repeat_group_intrnl_name: string | null;
  order_in_page: number | null;
  contents: string | null;
};

export function normalizeAssetPath(path: string | null) {
  if (!path) return "";
  if (path.startsWith("../../")) {
    return path.replace(/^\.\.\/\.\.\//, "/");
  }
  if (path.startsWith("../")) {
    return path.replace(/^\.\.\//, "/");
  }
  return path.startsWith("/") ? path : `/${path}`;
}

export async function getSubParagraphRows(paragraphInternalName: string) {
  const rows = await query<SubParaRow>(
    `
    SELECT sp.spid, sp.internal_name, sp.repeat_group_intrnl_name, sp.order_in_page, e.contents
    FROM ms_sub_paragraphs sp
    LEFT JOIN ms_paragraphs p ON p.pid = sp.fk_para_id
    LEFT JOIN ms_sub_para_elements e ON e.fk_sub_para_id = sp.spid
    WHERE p.internal_name = ?
    ORDER BY sp.order_in_page ASC, sp.spid ASC
    `,
    [paragraphInternalName]
  );
  return rows;
}

export async function getSubParagraphValue(internalName: string) {
  const rows = await query<{ contents: string | null }>(
    `
    SELECT e.contents
    FROM ms_sub_paragraphs sp
    LEFT JOIN ms_sub_para_elements e ON e.fk_sub_para_id = sp.spid
    WHERE sp.internal_name = ?
    LIMIT 1
    `,
    [internalName]
  );
  return rows[0]?.contents ?? "";
}

export async function setSubParagraphValue(internalName: string, value: string) {
  const rows = await query<{ spid: number }>(
    `SELECT spid FROM ms_sub_paragraphs WHERE internal_name = ? LIMIT 1`,
    [internalName]
  );
  if (!rows[0]) {
    throw new Error("Sub paragraph not found: " + internalName);
  }
  const spid = rows[0].spid;
  const existing = await query<{ eid: number }>(
    `SELECT eid FROM ms_sub_para_elements WHERE fk_sub_para_id = ? LIMIT 1`,
    [spid]
  );
  if (existing[0]) {
    await execute(`UPDATE ms_sub_para_elements SET contents = ? WHERE fk_sub_para_id = ?`, [value, spid]);
  } else {
    await execute(`INSERT INTO ms_sub_para_elements (fk_sub_para_id, contents) VALUES (?, ?)`, [spid, value]);
  }
}

export async function getConfig() {
  const [whatsapp, msgAr, msgEn, pass] = await Promise.all([
    getSubParagraphValue("cfgs_whatsapp"),
    getSubParagraphValue("cfgs_whats_msg_ar"),
    getSubParagraphValue("cfgs_whats_msg_en"),
    getSubParagraphValue("cfgs_wpass")
  ]);
  return {
    whatsapp,
    msgAr,
    msgEn,
    pass
  };
}

export async function getHomeData() {
  const [top, contact, journey, dontLeave] = await Promise.all([
    getSubParagraphRows("mp_top_photo"),
    getSubParagraphRows("contact_us"),
    getSubParagraphRows("draw_smile_jnry"),
    getSubParagraphRows("dont_leave")
  ]);

  const topMap = toMap(top);
  const contactMap = toMap(contact);
  const journeyMap = toMap(journey);
  const dontMap = toMap(dontLeave);

  return {
    top: {
      line1Ar: topMap.mp_top_photo_line1_ar || "",
      line1En: topMap.mp_top_photo_line1_en || "",
      line2Ar: topMap.mp_top_photo_line2_ar || "",
      line2En: topMap.mp_top_photo_line2_en || ""
    },
    contact: {
      textAr: contactMap.cu_text_ar || "",
      textEn: contactMap.cu_text_en || "",
      logo1: normalizeAssetPath(contactMap.cu_logo1 || ""),
      logo1NameAr: contactMap.cu_logo1_name_ar || "",
      logo1NameEn: contactMap.cu_logo1_name_en || "",
      logo2: normalizeAssetPath(contactMap.cu_logo2 || ""),
      logo2NameAr: contactMap.cu_logo2_name_ar || "",
      logo2NameEn: contactMap.cu_logo2_name_en || ""
    },
    journey: {
      photo1: normalizeAssetPath(journeyMap.dsj_photo1 || ""),
      photo1TextAr: journeyMap.dsj_photo1_text_ar || "",
      photo1TextEn: journeyMap.dsj_photo1_text_en || "",
      photo2: normalizeAssetPath(journeyMap.dsj_photo2 || ""),
      photo2TextAr: journeyMap.dsj_photo2_text_ar || "",
      photo2TextEn: journeyMap.dsj_photo2_text_en || "",
      photo3: normalizeAssetPath(journeyMap.dsj_photo3 || ""),
      photo3TextAr: journeyMap.dsj_photo3_text_ar || "",
      photo3TextEn: journeyMap.dsj_photo3_text_en || "",
      photo4: normalizeAssetPath(journeyMap.dsj_photo4 || ""),
      photo4TextAr: journeyMap.dsj_photo4_text_ar || "",
      photo4TextEn: journeyMap.dsj_photo4_text_en || "",
      photo5: normalizeAssetPath(journeyMap.dsj_photo5 || ""),
      photo5TextAr: journeyMap.dsj_photo5_text_ar || "",
      photo5TextEn: journeyMap.dsj_photo5_text_en || ""
    },
    dontLeave: {
      sidePhoto: normalizeAssetPath(dontMap.dl_side_photo || ""),
      textAr: dontMap.dl_text_ar || "",
      textEn: dontMap.dl_text_en || ""
    }
  };
}

export async function getEndlessSmiles() {
  const rows = await getSubParagraphRows("endless_smiles");
  const groups: Record<string, Record<string, string>> = {};
  for (const row of rows) {
    const groupKey = row.repeat_group_intrnl_name || "default";
    if (!groups[groupKey]) groups[groupKey] = {};
    groups[groupKey][row.internal_name] = row.contents || "";
  }
  const items = Object.keys(groups).map((key) => {
    const g = groups[key];
    const textAr = findFirst(g, "es_text_ar");
    const textEn = findFirst(g, "es_text_en");
    const before = findFirst(g, "es_photo_before");
    const after = findFirst(g, "es_photo_after");
    return {
      group: key,
      textAr,
      textEn,
      before: normalizeAssetPath(before),
      after: normalizeAssetPath(after)
    };
  });
  return items;
}

export async function getEndlessSmilesAdmin() {
  const rows = await getSubParagraphRows("endless_smiles");
  const groups: Record<
    string,
    {
      textAr?: string;
      textEn?: string;
      before?: string;
      after?: string;
      textArInternal?: string;
      textEnInternal?: string;
      beforeInternal?: string;
      afterInternal?: string;
    }
  > = {};

  for (const row of rows) {
    const groupKey = row.repeat_group_intrnl_name || "default";
    if (!groups[groupKey]) groups[groupKey] = {};
    if (row.internal_name.startsWith("es_text_ar")) {
      groups[groupKey].textAr = row.contents || "";
      groups[groupKey].textArInternal = row.internal_name;
    }
    if (row.internal_name.startsWith("es_text_en")) {
      groups[groupKey].textEn = row.contents || "";
      groups[groupKey].textEnInternal = row.internal_name;
    }
    if (row.internal_name.startsWith("es_photo_before")) {
      groups[groupKey].before = normalizeAssetPath(row.contents || "");
      groups[groupKey].beforeInternal = row.internal_name;
    }
    if (row.internal_name.startsWith("es_photo_after")) {
      groups[groupKey].after = normalizeAssetPath(row.contents || "");
      groups[groupKey].afterInternal = row.internal_name;
    }
  }

  return Object.entries(groups).map(([group, g]) => ({ group, ...g }));
}

function toMap(rows: SubParaRow[]) {
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.internal_name] = row.contents || "";
  }
  return map;
}

function findFirst(group: Record<string, string>, prefix: string) {
  const key = Object.keys(group).find((k) => k.startsWith(prefix));
  return key ? group[key] : "";
}
