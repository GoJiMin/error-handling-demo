import { useSuspenseQuery } from "@tanstack/react-query";
import { photoQueryOptions } from "./photoService";

function useRequestGetPhotos() {
  return useSuspenseQuery(photoQueryOptions.all());
}

export default useRequestGetPhotos;
