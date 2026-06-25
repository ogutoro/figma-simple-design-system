"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact";
import { submitContact } from "@/lib/api/contact";

type FormStatus = "idle" | "success" | "error";

const inputBase =
  "bg-(--sds-color-background-default-default) border rounded-(--sds-size-radius-200) px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) placeholder:text-(--sds-color-text-default-tertiary) w-full leading-none";

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setApiError(null);
    try {
      await submitContact(data);
      setFormStatus("success");
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "送信に失敗しました。";
      setApiError(message);
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) p-(--sds-size-space-600) flex flex-col gap-(--sds-size-space-400) items-center text-center w-full min-w-80 lg:w-80"
      >
        <p className="text-(length:--sds-typography-body-size-medium) font-semibold text-(--sds-color-text-default-default)">
          お問い合わせを受け付けました。
        </p>
        <p className="text-(length:--sds-typography-body-size-small) text-(--sds-color-text-default-secondary)">
          担当者より折り返しご連絡いたします。
        </p>
        <button
          type="button"
          onClick={() => setFormStatus("idle")}
          className="bg-(--sds-color-background-brand-default) border border-(--sds-color-border-brand-default) rounded-(--sds-size-radius-200) p-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-brand-on-brand) leading-none whitespace-nowrap"
        >
          もう一度送信する
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) p-(--sds-size-space-600) flex flex-col gap-(--sds-size-space-600) items-start w-full min-w-80 lg:w-80"
    >
      {formStatus === "error" && apiError && (
        <div
          role="alert"
          className="w-full rounded-(--sds-size-radius-200) border border-(--sds-color-red-500) bg-red-50 px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-small) text-(--sds-color-red-500)"
        >
          {apiError}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-(--sds-size-space-200) items-start w-full">
        <label
          htmlFor="name"
          className="text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) leading-[1.4]"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Value"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${inputBase} border-(${errors.name ? "--sds-color-red-500" : "--sds-color-border-default-default"})`}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-(length:--sds-typography-body-size-small) text-(--sds-color-red-500)">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Surname */}
      <div className="flex flex-col gap-(--sds-size-space-200) items-start w-full">
        <label
          htmlFor="surname"
          className="text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) leading-[1.4]"
        >
          Surname
        </label>
        <input
          id="surname"
          type="text"
          placeholder="Value"
          aria-invalid={!!errors.surname}
          aria-describedby={errors.surname ? "surname-error" : undefined}
          className={`${inputBase} border-(${errors.surname ? "--sds-color-red-500" : "--sds-color-border-default-default"})`}
          {...register("surname")}
        />
        {errors.surname && (
          <p id="surname-error" role="alert" className="text-(length:--sds-typography-body-size-small) text-(--sds-color-red-500)">
            {errors.surname.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-(--sds-size-space-200) items-start w-full">
        <label
          htmlFor="email"
          className="text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) leading-[1.4]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Value"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${inputBase} border-(${errors.email ? "--sds-color-red-500" : "--sds-color-border-default-default"})`}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-(length:--sds-typography-body-size-small) text-(--sds-color-red-500)">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-(--sds-size-space-200) items-start w-full">
        <label
          htmlFor="message"
          className="text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) leading-[1.4] w-full"
        >
          Message
        </label>
        <textarea
          id="message"
          placeholder="Value"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`bg-(--sds-color-background-default-default) border rounded-(--sds-size-radius-200) px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) placeholder:text-(--sds-color-text-default-tertiary) w-full min-h-20 leading-[1.4] resize-y border-(${errors.message ? "--sds-color-red-500" : "--sds-color-border-default-default"})`}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-(length:--sds-typography-body-size-small) text-(--sds-color-red-500)">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-(--sds-size-space-400) items-center w-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-(--sds-color-background-brand-default) border border-(--sds-color-border-brand-default) rounded-(--sds-size-radius-200) p-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-brand-on-brand) leading-none whitespace-nowrap text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "送信中..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
