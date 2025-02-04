import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPostTodo, TodoType } from "@/shared/apis/request/todo";
import QUERY_KEYS from "@/shared/lib/consts/queryKeys";

const useRequestPostTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id, title, description, priority }: TodoType) =>
      requestPostTodo({ id, title, description, priority }),
    onMutate: async (newTodo: TodoType) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.todo] });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.todo,
      ]);

      if (previousTodos) {
        queryClient.setQueryData<TodoType[]>(
          [QUERY_KEYS.todo],
          [...previousTodos, newTodo]
        );
      }

      return { previousTodos };
    },

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todo] }),

    onSettled: (data, error, newTodo, context) => {
      if (error && context) {
        queryClient.setQueryData([QUERY_KEYS.todo], context.previousTodos);
      }
    },
  });

  return {
    postTodo: mutate,
    ...rest,
  };
};

export default useRequestPostTodo;
