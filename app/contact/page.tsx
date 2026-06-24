import Header from "@/components/layout/Header";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-(--sds-color-background-default-secondary) flex flex-col items-center justify-center gap-(--sds-size-space-800) px-(--sds-size-space-600) py-(--sds-size-space-4000)">
          {/* タイトル */}
          <div className="flex flex-col items-center gap-(--sds-size-space-200) text-(--sds-color-text-brand-on-brand-tertiary) text-center w-full">
            <h1 className="font-bold leading-[1.2] tracking-[-0.96px] lg:tracking-[-2.16px] text-(length:--sds-typography-title-page-size-base) lg:text-(length:--sds-typography-title-hero-size) w-full">
              Contact Us
            </h1>
            <p className="text-(length:--sds-typography-subtitle-size-base) font-normal leading-[1.2] w-full">
              We&apos;d love to hear from you
            </p>
          </div>

          {/* フォームカード */}
          <form className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) p-(--sds-size-space-600) flex flex-col gap-(--sds-size-space-600) items-start w-full min-w-80 lg:w-80">
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
                name="name"
                placeholder="Value"
                className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) placeholder:text-(--sds-color-text-default-tertiary) w-full leading-none"
              />
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
                name="surname"
                placeholder="Value"
                className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) placeholder:text-(--sds-color-text-default-tertiary) w-full leading-none"
              />
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
                name="email"
                placeholder="Value"
                className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) placeholder:text-(--sds-color-text-default-tertiary) w-full leading-none"
              />
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
                name="message"
                placeholder="Value"
                className="bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) px-(--sds-size-space-400) py-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) placeholder:text-(--sds-color-text-default-tertiary) w-full min-h-20 leading-[1.4] resize-y"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-(--sds-size-space-400) items-center w-full">
              <button
                type="submit"
                className="flex-1 bg-(--sds-color-background-brand-default) border border-(--sds-color-border-brand-default) rounded-(--sds-size-radius-200) p-(--sds-size-space-300) text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-brand-on-brand) leading-none whitespace-nowrap text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
