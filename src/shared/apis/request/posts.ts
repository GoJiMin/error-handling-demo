import { endpoints } from "@/shared/lib/consts/endpoints";
import { requestGet } from "../request";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const requestGetPosts = () => {
  return requestGet<Post[]>({
    baseUrl: BASE_URL,
    endpoint: endpoints.posts.getPosts,
    errorHandlingStrategy: "errorBoundary",
  });
};
