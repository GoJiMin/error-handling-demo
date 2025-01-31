import { endpoints } from "@/shared/lib/consts/endpoints";
import { requestGet } from "../request";

export type TodoType = {
  id: number;
  title: string;
  description: string;
};

export const requestGetAllTodo = async (): Promise<TodoType[]> => {
  return requestGet<TodoType[]>({
    endpoint: endpoints.todo.getAllTodo,
    errorHandlingStrategy: "errorBoundary",
  });
};
