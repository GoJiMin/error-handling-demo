import { requestGetPhotos } from "@/shared/apis/request/photo";

const photoQueryKeys = {
  all: ["photos"] as const,
};

export const photoQueryOptions = {
  all: () => ({
    queryKey: photoQueryKeys.all,
    queryFn: requestGetPhotos,
  }),
};
