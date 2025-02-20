import { requestGetPosts } from "@/shared/apis/request/posts";

const postQueryKeys = {
  all: ["posts"] as const,
};

export const postQueryOptions = {
  all: () => ({
    queryKey: postQueryKeys.all,
    queryFn: requestGetPosts,
  }),
};
