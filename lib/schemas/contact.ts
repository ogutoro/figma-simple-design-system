import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(50, "50文字以内で入力してください"),
  surname: z
    .string()
    .min(1, "苗字を入力してください")
    .max(50, "50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  message: z
    .string()
    .min(1, "メッセージを入力してください")
    .max(1000, "1000文字以内で入力してください"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
