"use client";

import TodoItem from "./TodoItem";
import { useRequestGetAllTodo } from "@/entities/todo";
import { LucideIcon } from "@/shared/ui/icons";

export default function DisplayTodo() {
  const todoList = useRequestGetAllTodo();

  if (todoList.length === 0) {
    return (
      <section className="flex flex-col justify-center items-center">
        <LucideIcon name="CalendarX2" size={150} />
        <h2 className="text-3xl font-semibold mt-4 mb-5">
          등록된 투두가 없어요.
        </h2>
        <p>왼쪽에서 제목, 내용, 중요도를 선택해 투두를 입력할 수 있어요!</p>
      </section>
    );
  }

  return (
    <ul className="border border-gray-200 rounded-md shadow-md p-4 flex flex-col h-[900px] gap-5 overflow-auto">
      {todoList.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
}
