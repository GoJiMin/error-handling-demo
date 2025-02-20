import { useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "./userService";

const useRequestGetUser = (id: string) => {
  const { data } = useSuspenseQuery(userQueryOptions.all(id));

  return data;
};

export default useRequestGetUser;
