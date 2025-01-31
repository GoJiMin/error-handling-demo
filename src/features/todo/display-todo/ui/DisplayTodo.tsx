"use client";

import { useRequestGetAllTodo } from "@/entities/todo";

export default function DisplayTodo() {
  const todoList = useRequestGetAllTodo();

  return (
    <ul>
      {todoList.map(({ id, title, description }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
        </li>
      ))}
    </ul>
  );
}
