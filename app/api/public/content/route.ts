import { NextResponse } from "next/server";
import { getConfig, getEndlessSmiles, getHomeData } from "../../../../lib/content";

export async function GET() {
  const [config, home, smiles] = await Promise.all([getConfig(), getHomeData(), getEndlessSmiles()]);
  return NextResponse.json({ config, home, smiles });
}
