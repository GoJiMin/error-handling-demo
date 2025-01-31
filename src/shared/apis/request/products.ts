import { endpoints } from "@/shared/lib/consts/endpoints";
import { requestGet } from "../request";

export type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
};

export const requestGetAllProducts = async (): Promise<Product[]> => {
  return requestGet<Product[]>({
    endpoint: endpoints.products.getAllProducts,
    errorHandlingStrategy: "errorBoundary",
  });
};

export const requestGetProduct = async (id: string): Promise<Product> => {
  return requestGet<Product>({
    endpoint: endpoints.products.getProducts(id),
  });
};
