"use client";

import { useRequestGetPhotos } from "@/entities/photo";

export default function PhotoList() {
  const { data } = useRequestGetPhotos();

  return (
    <section>
      {data && data.map(({ id, title }) => <li key={id}>{title}</li>)}
      {/* {data.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))} */}
    </section>
  );
}
