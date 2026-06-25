import type { ContactFormValues } from "@/lib/schemas/contact";

export interface ContactApiResponse {
  message?: string;
  error?: string;
}

export async function submitContact(data: ContactFormValues): Promise<ContactApiResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json: ContactApiResponse = await res.json();

  if (!res.ok) {
    throw new Error(json.error ?? "送信に失敗しました。");
  }

  return json;
}
