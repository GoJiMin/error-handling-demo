export type FormFieldName = "title" | "description" | "priority";
export type FormFieldType = "text" | "select";

export type FormType = {
  name: FormFieldName;
  label: string;
  placeholder: string;
  description: string;
  type: FormFieldType;
  options?: { value: string; label: string }[];
};

export const FORM_FIELDS: FormType[] = [
  {
    name: "title",
    label: "제목",
    placeholder: "제목을 입력해주세요.",
    description: "리스트에 입력될 제목을 입력해주세요.",
    type: "text",
  },
  {
    name: "description",
    label: "내용",
    placeholder: "내용을 입력해주세요.",
    description: "리스트에 입력될 내용을 입력해주세요.",
    type: "text",
  },
  {
    name: "priority",
    label: "중요도",
    placeholder: "중요도를 선택해주세요.",
    description: "입력한 투두의 중요도를 선택해주세요.",
    type: "select",
    options: [
      { value: "상", label: "상" },
      { value: "중", label: "중" },
      { value: "하", label: "하" },
    ],
  },
] as const;
