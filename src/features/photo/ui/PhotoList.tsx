"use client";

import { useRequestGetPhotos } from "@/entities/photo";
import { useCallback } from "react";
import PhotoCard from "./PhotoCard";
import PhotoCardLoading from "./PhotoCardLoading";

export default function PhotoList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRequestGetPhotos();

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observer.observe(node);

      return () => observer.disconnect();
    },
    [hasNextPage, fetchNextPage]
  );

  return (
    <section className="w-full h-full  flex flex-col justify-center items-center p-4">
      <ul className="flex flex-col gap-5 max-w-[650px]">
        {data.pages.map((page) =>
          page.map((photo, index) => (
            <li key={photo.id}>
              <PhotoCard photo={photo} priority={index < 5} />
            </li>
          ))
        )}
      </ul>
      <div className="h-[250px] mt-5 max-w-[650px]" ref={observerRef}>
        {isFetchingNextPage && <PhotoCardLoading />}
      </div>
    </section>
  );
}
