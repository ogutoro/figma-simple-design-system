import { http, HttpResponse, delay } from "msw";

export const contactHandlers = [
  http.post("/api/contact", async ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get("error") === "true") {
      await delay(300);
      return HttpResponse.json(
        { error: "サーバーエラーが発生しました。しばらくしてから再度お試しください。" },
        { status: 500 }
      );
    }

    await delay(800);
    return HttpResponse.json(
      { message: "お問い合わせを受け付けました。" },
      { status: 200 }
    );
  }),
];
