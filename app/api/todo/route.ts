import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const data = readFileSync(filePath, "utf-8");

  await new Promise((resolve) => setTimeout(resolve, 3500));

  return NextResponse.json(JSON.parse(data));
}
