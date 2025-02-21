import { endpoints } from "@/shared/lib/consts/endpoints";
import { requestGet } from "../request";

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const requestGetPhotos = ({ pageParam }: { pageParam: number }) => {
  return requestGet<Photo[]>({
    baseUrl: BASE_URL,
    endpoint: endpoints.photo.getPhotos,
    queryParams: {
      _start: pageParam,
      _limit: 10,
    },
    errorHandlingStrategy: "errorBoundary",
  });
};
