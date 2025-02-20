import { useSuspenseQuery } from "@tanstack/react-query";
import { postQueryOptions } from "./postService";

function useRequestGetPosts() {
  return useSuspenseQuery(postQueryOptions.all());
}

export default useRequestGetPosts;
