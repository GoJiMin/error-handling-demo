import { z } from "zod";

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z.object({
  title: z
    .string({
      required_error: "제목은 필수 입력 사항입니다.",
    })
    .min(3, "제목은 3자 이상 입력해주세요.")
    .max(30, "제목은 30자 이하만 입력 가능합니다."),
  description: z
    .string({
      required_error: "내용은 필수 입력 사항입니다.",
    })
    .max(100, "내용은 100자 이하만 입력 가능합니다."),
  priority: z.union([z.literal("상"), z.literal("중"), z.literal("하")]),
});
