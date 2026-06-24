import Button from "@/components/ui/Button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export default function Hero({
  title = "Title",
  subtitle = "Subtitle",
  primaryLabel = "Button",
  secondaryLabel = "Button",
  primaryHref = "#",
  secondaryHref = "#",
}: HeroProps) {
  return (
    <section className="flex flex-col items-center gap-(--sds-size-space-800) bg-(--sds-color-background-default-secondary) px-(--sds-size-space-400) py-(--sds-size-space-4000) text-center w-full lg:px-(--sds-size-space-600)">
      <div className="flex flex-col items-center gap-(--sds-size-space-200) w-full">
        <h1 className="font-bold leading-[1.2] text-(--sds-color-text-default-default) text-(length:--sds-typography-title-page-size-base) tracking-[-0.02em] w-full lg:text-(length:--sds-typography-title-hero-size) lg:tracking-[-0.03em]">
          {title}
        </h1>
        <p className="font-normal leading-[1.2] text-(--sds-color-text-default-secondary) text-(length:--sds-typography-subtitle-size-base) w-full">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-(--sds-size-space-400) w-[240px]">
        <Button variant="secondary" href={secondaryHref} className="flex-1">
          {secondaryLabel}
        </Button>
        <Button variant="primary" href={primaryHref} className="flex-1">
          {primaryLabel}
        </Button>
      </div>
    </section>
  );
}
