import { requestGetAllTodo } from "@/shared/apis/request/todo";

export const todoQueryKeys = {
  all: ["todo"] as const,
};

export const todoQueryOptions = {
  all: () => ({
    queryKey: todoQueryKeys.all,
    queryFn: requestGetAllTodo,
  }),
};
