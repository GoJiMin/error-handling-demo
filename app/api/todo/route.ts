import { readFileSync, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const data = readFileSync(filePath, "utf-8");

  // 에러 확인하고 싶으면 주석 풀기. 이건 지역 에러 바운더리가 잡아내요.
  // return NextResponse.json(
  //   {
  //     errorCode: "TODO_NOT_FOUND",
  //     message: "투두 내역을 불러오는데 실패했어요.",
  //   },
  //   { status: 404 }
  // );

  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const filePath = path.join(process.cwd(), "public", "data.json");

  const fileData = readFileSync(filePath, "utf-8");
  const todos = JSON.parse(fileData);

  todos.push(data);

  // 에러 확인하고 싶으면 주석 풀기. 이건 ErrorCatcher가 잡아내요.
  // return NextResponse.json(
  //   {
  //     errorCode: "TODO_TITLE_INVALID",
  //     message: "입력 형식을 확인해주세요.",
  //   },
  //   { status: 404 }
  // );

  writeFileSync(filePath, JSON.stringify(todos));

  return NextResponse.json({ message: "성공!" });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const filePath = path.join(process.cwd(), "public", "data.json");

  const fileData = readFileSync(filePath, "utf-8");
  const todos = JSON.parse(fileData);

  // 에러 확인하고 싶으면 주석 풀기. 이건 ErrorCatcher가 잡아내요.
  // return NextResponse.json(
  //   {
  //     errorCode: "TODO_ID_INVALID",
  //     message: "삭제할 투두의 아이디를 찾지 못했습니다.",
  //   },
  //   { status: 404 }
  // );

  if (todos instanceof Array) {
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    writeFileSync(filePath, JSON.stringify(filteredTodos));
  }

  return NextResponse.json({ message: "성공!" });
}
