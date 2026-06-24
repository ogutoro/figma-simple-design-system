import Avatar from "./Avatar";

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarSrc?: string;
}

export default function TestimonialCard({
  quote,
  authorName,
  authorTitle,
  avatarSrc,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-(--sds-size-space-600) p-(--sds-size-space-600) bg-(--sds-color-background-default-default) border border-(--sds-color-border-default-default) rounded-(--sds-size-radius-200) flex-1 min-w-[300px]">
      <p className="text-(--sds-color-text-default-default) text-(length:--sds-typography-heading-size-base) font-(--sds-typography-heading-font-weight) leading-[1.2] tracking-[-0.02em]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex gap-(--sds-size-space-300) items-center">
        <Avatar src={avatarSrc} alt={authorName} />
        <div className="flex flex-col gap-(--sds-size-space-050)">
          <span className="text-(--sds-color-text-default-secondary) text-(length:--sds-typography-body-size-medium) font-(--sds-typography-body-font-weight-strong) leading-[1.4]">
            {authorName}
          </span>
          <span className="text-(--sds-color-text-default-tertiary) text-(length:--sds-typography-body-size-medium) font-(--sds-typography-body-font-weight-regular) leading-[1.4]">
            {authorTitle}
          </span>
        </div>
      </div>
    </div>
  );
}
