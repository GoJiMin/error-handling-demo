import { Metadata } from "next";
import pretendard from "@/app/fonts";
import Providers from "@/app/providers";
import { Header } from "@/widgets/header";
import { Toaster } from "@/shared/components/ui/toaster";
import "@/app/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: {
    default: "에러 처리 데모 앱이에요.",
    template: "데모 앱 | %s",
  },
  description: "에러 핸들링 전략을 어떻게 효율적으로 세울까 고민했어요.",
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body
        className={`${pretendard.className} antialiased flex flex-col w-full h-full`}
      >
        <Providers>
          <Header />
          <main className="grow w-full max-w-screen-xl mx-auto">
            {children}
          </main>
          <ReactQueryDevtools />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
