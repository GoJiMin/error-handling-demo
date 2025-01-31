"use client";

import Image from "next/image";
import useRequestGetAllProducts from "@/entities/products/model/useRequestGetAllProducts";

export default function ProductList() {
  const products = useRequestGetAllProducts();

  return (
    <ul className="flex flex-col gap-4">
      {products.map(({ id, description, price, title, image }) => (
        <li key={id} className="border-2 border-gray-200 rounded-md shadow-lg">
          <article className="flex gap-2 ">
            <section className="w-full p-2">
              <h2 className="text-2xl">{title}</h2>
              <p className="text-sm text-end mb-6">{price}원</p>
              <p>{description}</p>
            </section>
            <Image
              className="rounded-md"
              src={image}
              width={500}
              height={300}
              alt={`${title}-Image`}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
