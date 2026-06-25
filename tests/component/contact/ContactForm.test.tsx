import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/node";
import ContactForm from "@/components/contact/ContactForm";

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Name"), "Taro");
  await user.type(screen.getByLabelText("Surname"), "Yamada");
  await user.type(screen.getByLabelText("Email"), "taro@example.com");
  await user.type(screen.getByLabelText("Message"), "お問い合わせ内容です。");
};

describe("ContactForm", () => {
  it("4つのフィールドとSubmitボタンが表示される", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Surname")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("空フォームを送信すると全フィールドにエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("名前を入力してください")).toBeInTheDocument();
      expect(screen.getByText("苗字を入力してください")).toBeInTheDocument();
      expect(screen.getByText("メールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("メッセージを入力してください")).toBeInTheDocument();
    });
  });

  it("不正なemailでblurするとemailエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Email"), "invalid-email");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("有効なメールアドレスを入力してください")).toBeInTheDocument();
    });
  });

  it("正常送信後に成功メッセージが表示され、フォームが非表示になる", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(
      () => {
        expect(screen.getByText("お問い合わせを受け付けました。")).toBeInTheDocument();
        expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("送信中はボタンがdisabledになり「送信中...」と表示される", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByRole("button", { name: "送信中..." })).toBeDisabled();
  });

  it("APIエラー時にエラーバナーが表示され、フォームが保持される", async () => {
    server.use(
      http.post("/api/contact", () =>
        HttpResponse.json(
          { error: "サーバーエラーが発生しました。しばらくしてから再度お試しください。" },
          { status: 500 }
        )
      )
    );

    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("サーバーエラーが発生しました。しばらくしてから再度お試しください。")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });
  });

  it("成功後に「もう一度送信する」をクリックするとフォームが再表示される", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(
      () => expect(screen.getByText("お問い合わせを受け付けました。")).toBeInTheDocument(),
      { timeout: 3000 }
    );

    await user.click(screen.getByRole("button", { name: "もう一度送信する" }));

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
