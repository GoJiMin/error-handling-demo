import { todoQueryOptions } from "@/entities/todo";
import { DisplayTodo } from "@/features/todo/display-todo";
import { InputTodo } from "@/features/todo/input-todo";
import { getDehydratedQuery } from "@/shared/lib/utils/react-query";
import { ErrorFallbackWithIcon } from "@/shared/ui/error-fallback";
import { LucideIcon } from "@/shared/ui/icons";
import { LoadingSpinner } from "@/shared/ui/spinners";
import { RQProvider } from "@/shared/ui/react-query";

export default async function TodoPage() {
  const { query } = await getDehydratedQuery({
    query: todoQueryOptions.all(),
    useSuspense: true,
  });

  return (
    <section className="w-full h-full flex flex-col">
      <section className="h-full grid grid-cols-[0.7fr_1fr] p-2 gap-6">
        <article className="flex flex-col justify-center gap-10 ml-2">
          <div className="flex flex-col items-center text-center ">
            <LucideIcon name="ClipboardList" size={150} className="mb-2" />
            <h2 className="text-2xl font-semibold mb-4">
              오늘의 일정을 관리해보세요!
            </h2>
            <p>
              제목과 내용을 입력해 화면 오른쪽 투두리스트에 등록할 수 있어요.
            </p>
            <p>등록된 투두의 휴지통을 클릭해 투두를 삭제할 수 있어요.</p>
          </div>
          <InputTodo />
        </article>
        <RQProvider
          state={query}
          LoadingFallback={
            <LoadingSpinner text="저장된 리스트를 불러오고 있어요." />
          }
          ErrorFallback={ErrorFallbackWithIcon}
        >
          <DisplayTodo />
        </RQProvider>
      </section>
    </section>
  );
}
