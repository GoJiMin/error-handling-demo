import { requestGetAllProducts } from "@/shared/apis/request/products";

const productsQueryKeys = {
  all: ["products"] as const,
};

export const productsQueryOptions = {
  all: () => ({
    queryKey: productsQueryKeys.all,
    queryFn: requestGetAllProducts,
  }),
};
