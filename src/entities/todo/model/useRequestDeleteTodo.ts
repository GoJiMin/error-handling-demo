import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoQueryKeys } from "./todoService";
import { requestDeleteTodo, TodoType } from "@/shared/apis/request/todo";

const useRequestDeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (id: string) => requestDeleteTodo(id),
    onMutate: async (id: string) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: todoQueryKeys.all });

      const previousTodos = queryClient.getQueryData<TodoType[]>(
        todoQueryKeys.all
      );

      if (previousTodos) {
        queryClient.setQueryData<TodoType[]>(
          todoQueryKeys.all,
          previousTodos.filter((todo) => todo.id !== id)
        );
      }

      return { previousTodos };
    },

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all }),

    onSettled: (data, error, id, context) => {
      if (error && context) {
        queryClient.setQueryData(todoQueryKeys.all, context.previousTodos);
      }
    },
  });

  return { deleteTodo: mutate, ...rest };
};

export default useRequestDeleteTodo;
