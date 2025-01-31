"use client";

import useRequestGetUser from "@/entities/user/model/useRequestGetUser";
import { LucideIcon } from "@/shared/ui/icons";

export default function UserCard() {
  const { userEmail, userId, userName } = useRequestGetUser("id253");

  return (
    <section className="flex justify-center items-center gap-4 border border-gray-200 p-2 shadow-md rounded-md">
      <LucideIcon name="CircleUserRound" size={130} />
      <article>
        <h2 className="text-3xl">{userName}</h2>
        <p className="text-sm text-neutral-400">{userId}</p>
        <p className="text-sm">{userEmail}</p>
      </article>
    </section>
  );
}
