import { LucideIcon } from "@/shared/ui/icons";

export default function DisplayTodoLoading() {
  return (
    <section className="w-full h-full flex flex-col gap-2 justify-center items-center border border-gray-200 rounded-md">
      <LucideIcon name="LoaderCircle" className="animate-spin" size={45} />
      <p>저장된 리스트를 불러오고 있어요.</p>
    </section>
  );
}
