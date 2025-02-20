import { NextResponse } from "next/server";

export async function GET() {
  // 에러 던져서 확인해보고 싶으면 주석 풀기.
  // return NextResponse.json(
  //   {
  //     errorCode: "PRODUCTS_NOT_FOUND",
  //     message: "상품 정보를 찾을 수 없어요.",
  //   },
  //   { status: 404 }
  // );

  return NextResponse.json([
    {
      id: "1124",
      title: "멋진 청바지",
      description:
        "24FW 시즌의 아주 멋진 청바지, 24FW 시즌의 아주 멋진 청바지, 24FW 시즌의 아주 멋진 청바지, 24FW 시즌의 아주 멋진 청바지",
      image: "https://picsum.photos/500/300",
      price: 98000,
    },
    {
      id: "1125",
      title: "멋진 자켓",
      description:
        "24FW 시즌의 아주 멋진 자켓, 24FW 시즌의 아주 멋진 자켓, 24FW 시즌의 아주 멋진 자켓, 24FW 시즌의 아주 멋진 자켓",
      image: "https://picsum.photos/500/300",
      price: 88000,
    },
    {
      id: "1126",
      title: "멋진 신발",
      description:
        "24FW 시즌의 아주 멋진 신발, 24FW 시즌의 아주 멋진 신발, 24FW 시즌의 아주 멋진 신발, 24FW 시즌의 아주 멋진 신발, 24FW 시즌의 아주 멋진 신발",
      image: "https://picsum.photos/500/300",
      price: 58000,
    },
    {
      id: "1127",
      title: "멋진 무언가",
      description:
        "24FW 시즌의 아주 멋진 무언가, 24FW 시즌의 아주 멋진 무언가, 24FW 시즌의 아주 멋진 무언가, 24FW 시즌의 아주 멋진 무언가",
      image: "https://picsum.photos/500/300",
      price: 128000,
    },
  ]);
}
