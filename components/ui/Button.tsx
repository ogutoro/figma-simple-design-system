import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-(--sds-color-background-brand-default) border-(--sds-color-border-brand-default) text-(--sds-color-text-brand-on-brand)",
  secondary:
    "bg-(--sds-color-background-neutral-tertiary) border-(--sds-color-border-neutral-secondary) text-(--sds-color-text-default-default)",
};

const baseClasses =
  "inline-flex items-center justify-center gap-(--sds-size-space-200) px-(--sds-size-space-200) py-(--sds-size-space-200) rounded-(--sds-size-radius-200) border border-solid text-(length:--sds-typography-body-size-medium) font-(--sds-typography-body-font-weight-regular) whitespace-nowrap overflow-hidden";

export default function Button({
  children,
  variant = "secondary",
  href,
  type = "button",
  className,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className ?? ""}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
