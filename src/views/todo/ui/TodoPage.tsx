import { DisplayTodo, DisplayTodoLoading } from "@/features/todo/display-todo";
import { Suspense } from "react";

export default function TodoPage() {
  return (
    <section className="w-full h-full flex flex-col">
      <h2>투두리스트</h2>
      <Suspense fallback={<DisplayTodoLoading />}>
        <DisplayTodo />
      </Suspense>
      <section></section>
    </section>
  );
}
