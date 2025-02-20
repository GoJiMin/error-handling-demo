import { LucideIcon } from "../icons";

type Props = {
  text?: string;
};

export default function LoadingSpinner({ text }: Props) {
  return (
    <section className="w-full h-full flex flex-col gap-2 justify-center items-center border border-gray-200 rounded-md">
      <LucideIcon name="LoaderCircle" className="animate-spin" size={45} />
      {text && <p>{text}</p>}
    </section>
  );
}
