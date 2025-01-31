import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Context) {
  const { id } = await params;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (id === "USER_NOT_FOUND") {
    return NextResponse.json(
      {
        errorCode: "USER_NOT_FOUND",
        message: "유저 정보를 찾을 수 없어요.",
      },
      { status: 404 }
    );
  }

  if (id === "TOKEN_NOT_FOUND") {
    return NextResponse.json(
      {
        errorCode: "TOKEN_NOT_FOUND",
        message: "로그인 토큰이 만료되었어요.",
      },
      { status: 401 }
    );
  }

  if (id === "INTERNEL_SERVER_ERROR") {
    return NextResponse.json(
      {
        errorCode: "INTERNER_SERVER_ERROR",
        message: "서버 내부에 에러가 발생했어요.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    userId: "@im_jnin",
    userName: "지민지민",
    userEmail: "jimin@jimin.com",
  });
}
