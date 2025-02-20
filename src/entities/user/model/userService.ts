import { requestGetUser } from "@/shared/apis/request/users";

const userQueryKeys = {
  all: ["user"] as const,
};

export const userQueryOptions = {
  all: (id: string) => ({
    queryKey: userQueryKeys.all,
    queryFn: () => requestGetUser(id),
  }),
};
