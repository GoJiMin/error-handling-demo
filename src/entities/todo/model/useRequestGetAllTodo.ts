import { useSuspenseQuery } from "@tanstack/react-query";
import { todoQueryOptions } from "./todoService";

const useRequestGetAllTodo = () => {
  const { data } = useSuspenseQuery(todoQueryOptions.all());

  return data;
};

export default useRequestGetAllTodo;
