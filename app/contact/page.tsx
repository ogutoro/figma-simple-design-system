import Header from "@/components/layout/Header";
import ContactForm from "@/components/contact/ContactForm";

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

          <ContactForm />
        </section>
      </main>
    </>
  );
}
