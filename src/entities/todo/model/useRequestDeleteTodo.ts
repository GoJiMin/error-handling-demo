import { requestDeleteTodo, TodoType } from "@/shared/apis/request/todo";
import QUERY_KEYS from "@/shared/lib/consts/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRequestDeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (id: string) => requestDeleteTodo(id),
    onMutate: async (id: string) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.todo] });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.todo,
      ]);

      if (previousTodos) {
        queryClient.setQueryData<TodoType[]>(
          [QUERY_KEYS.todo],
          previousTodos.filter((todo) => todo.id !== id)
        );
      }

      return { previousTodos };
    },

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todo] }),

    onSettled: (data, error, id, context) => {
      if (error && context) {
        queryClient.setQueryData([QUERY_KEYS.todo], context.previousTodos);
      }
    },
  });

  return { deleteTodo: mutate, ...rest };
};

export default useRequestDeleteTodo;
