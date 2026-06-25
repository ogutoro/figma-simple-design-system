import { test, expect } from "@playwright/test";

const BASE = "/contact";

const VALID = {
  name: "Taro",
  surname: "Yamada",
  email: "taro@example.com",
  message: "お問い合わせ内容です。",
};

async function fillForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Name", { exact: true }).fill(VALID.name);
  await page.getByLabel("Surname", { exact: true }).fill(VALID.surname);
  await page.getByLabel("Email", { exact: true }).fill(VALID.email);
  await page.getByLabel("Message", { exact: true }).fill(VALID.message);
}

test.describe("Contact フォーム", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    // MSW Service Worker が起動するまで待機
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null, {
      timeout: 10000,
    }).catch(() => {
      // 開発サーバー初回起動時にSWが未登録の場合はそのまま続行
    });
  });

  test("空フォームを送信すると全フィールドにエラーが表示される", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("名前を入力してください")).toBeVisible();
    await expect(page.getByText("苗字を入力してください")).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください")).toBeVisible();
    await expect(page.getByText("メッセージを入力してください")).toBeVisible();
  });

  test("nameをblurするとnameエラーのみ表示される", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).click();
    await page.getByLabel("Surname", { exact: true }).click();

    await expect(page.getByText("名前を入力してください")).toBeVisible();
    await expect(page.getByText("苗字を入力してください")).not.toBeVisible();
  });

  test("不正なemailでblurするとemailエラーが表示される", async ({ page }) => {
    await page.getByLabel("Email", { exact: true }).fill("invalid-email");
    await page.getByLabel("Name", { exact: true }).click();

    await expect(page.getByText("有効なメールアドレスを入力してください")).toBeVisible();
  });

  test("正常送信フロー: 成功メッセージが表示されフォームが非表示になる", async ({ page }) => {
    await fillForm(page);
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("お問い合わせを受け付けました。")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByLabel("Name")).not.toBeVisible();
  });

  test("送信中はボタンがdisabledで「送信中...」と表示される", async ({ page }) => {
    await fillForm(page);
    await page.getByRole("button", { name: "Submit" }).click();

    const submitBtn = page.getByRole("button", { name: "送信中..." });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeDisabled();
  });

  test("成功後に「もう一度送信する」でフォームが再表示される", async ({ page }) => {
    await fillForm(page);
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("お問い合わせを受け付けました。")).toBeVisible({
      timeout: 5000,
    });

    await page.getByRole("button", { name: "もう一度送信する" }).click();

    await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  test("キーボードのみでフォームを送信できる", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).focus();
    await page.keyboard.type(VALID.name);
    await page.keyboard.press("Tab");
    await page.keyboard.type(VALID.surname);
    await page.keyboard.press("Tab");
    await page.keyboard.type(VALID.email);
    await page.keyboard.press("Tab");
    await page.keyboard.type(VALID.message);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    await expect(page.getByText("お問い合わせを受け付けました。")).toBeVisible({
      timeout: 5000,
    });
  });
});
