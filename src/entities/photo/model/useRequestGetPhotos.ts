import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { photoQueryOptions } from "./photoService";

function useRequestGetPhotos() {
  return useSuspenseInfiniteQuery({
    ...photoQueryOptions.all(),
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.length === 10 ? lastPageParam + 10 : null,
  });
}

export default useRequestGetPhotos;
