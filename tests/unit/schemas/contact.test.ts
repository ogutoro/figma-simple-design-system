import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/schemas/contact";

const validData = {
  name: "Taro",
  surname: "Yamada",
  email: "taro@example.com",
  message: "お問い合わせ内容です。",
};

describe("contactSchema", () => {
  it("正常な入力値でパースが成功する", () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("name", () => {
    it("空文字のとき「名前を入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, name: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("名前を入力してください");
      }
    });

    it("51文字のとき「50文字以内で入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, name: "a".repeat(51) });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("50文字以内で入力してください");
      }
    });

    it("50文字ちょうどは有効", () => {
      const result = contactSchema.safeParse({ ...validData, name: "a".repeat(50) });
      expect(result.success).toBe(true);
    });
  });

  describe("surname", () => {
    it("空文字のとき「苗字を入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, surname: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("苗字を入力してください");
      }
    });

    it("51文字のとき「50文字以内で入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, surname: "a".repeat(51) });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("50文字以内で入力してください");
      }
    });
  });

  describe("email", () => {
    it("空文字のとき「メールアドレスを入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("メールアドレスを入力してください");
      }
    });

    it("不正フォーマットのとき「有効なメールアドレスを入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, email: "invalid-email" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("有効なメールアドレスを入力してください");
      }
    });
  });

  describe("message", () => {
    it("空文字のとき「メッセージを入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, message: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("メッセージを入力してください");
      }
    });

    it("1001文字のとき「1000文字以内で入力してください」エラーになる", () => {
      const result = contactSchema.safeParse({ ...validData, message: "a".repeat(1001) });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("1000文字以内で入力してください");
      }
    });

    it("1000文字ちょうどは有効", () => {
      const result = contactSchema.safeParse({ ...validData, message: "a".repeat(1000) });
      expect(result.success).toBe(true);
    });
  });
});
