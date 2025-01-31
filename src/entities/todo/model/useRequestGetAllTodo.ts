"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { requestGetAllTodo } from "@/shared/apis/request/todo";
import QUERY_KEYS from "@/shared/lib/consts/queryKeys";

const useRequestGetAllTodo = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.todo],
    queryFn: () => requestGetAllTodo(),
  });

  return data;
};

export default useRequestGetAllTodo;
