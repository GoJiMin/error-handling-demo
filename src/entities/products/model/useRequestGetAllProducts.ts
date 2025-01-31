"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { requestGetAllProducts } from "@/shared/apis/request/products";
import QUERY_KEYS from "@/shared/lib/consts/queryKeys";

const useRequestGetAllProducts = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.products],
    queryFn: () => requestGetAllProducts(),
  });

  return data;
};

export default useRequestGetAllProducts;
