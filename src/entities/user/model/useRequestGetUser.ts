"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { requestGetUser } from "@/shared/apis/request/users";
import QUERY_KEYS from "@/shared/lib/consts/queryKeys";

const useRequestGetUser = (id: string) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: () => requestGetUser(id),
  });

  return data;
};

export default useRequestGetUser;
