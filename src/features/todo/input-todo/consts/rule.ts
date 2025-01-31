import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "제목은 필수 입력 사항입니다."),
  description: z.string().min(1, "내용은 필수 입력 사항입니다."),
});
