import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "./productService";

const useRequestGetAllProducts = () => {
  const { data } = useSuspenseQuery(productsQueryOptions.all());

  return data;
};

export default useRequestGetAllProducts;
