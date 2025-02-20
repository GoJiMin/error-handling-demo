import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoQueryKeys } from "./todoService";
import { requestPostTodo, TodoType } from "@/shared/apis/request/todo";

const useRequestPostTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id, title, description, priority }: TodoType) =>
      requestPostTodo({ id, title, description, priority }),
    onMutate: async (newTodo: TodoType) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: todoQueryKeys.all });

      const previousTodos = queryClient.getQueryData<TodoType[]>(
        todoQueryKeys.all
      );

      if (previousTodos) {
        queryClient.setQueryData<TodoType[]>(todoQueryKeys.all, [
          ...previousTodos,
          newTodo,
        ]);
      }

      return { previousTodos };
    },

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all }),

    onSettled: (data, error, newTodo, context) => {
      if (error && context) {
        queryClient.setQueryData(todoQueryKeys.all, context.previousTodos);
      }
    },
  });

  return {
    postTodo: mutate,
    ...rest,
  };
};

export default useRequestPostTodo;
