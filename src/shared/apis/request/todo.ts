import { endpoints } from "@/shared/lib/consts/endpoints";
import {
  requestDelete,
  requestGet,
  requestPostWithoutResponse,
} from "../request";

export type TodoType = {
  id: string;
  title: string;
  description: string;
  priority: "상" | "중" | "하";
};

export const requestGetAllTodo = async (): Promise<TodoType[]> => {
  return requestGet<TodoType[]>({
    endpoint: endpoints.todo.getAllTodo,
    errorHandlingStrategy: "errorBoundary",
  });
};

export const requestPostTodo = async ({
  id,
  title,
  description,
  priority,
}: TodoType) => {
  await requestPostWithoutResponse({
    endpoint: endpoints.todo.postTodo,
    body: {
      id,
      title,
      description,
      priority,
    },
  });
};

export const requestDeleteTodo = async (id: string) => {
  await requestDelete({ endpoint: endpoints.todo.deleteTodo, body: { id } });
};
