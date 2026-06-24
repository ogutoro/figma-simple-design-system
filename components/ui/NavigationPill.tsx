"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationPillProps {
  href: string;
  label: string;
}

export default function NavigationPill({ href, label }: NavigationPillProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[
        "flex items-center justify-center px-(--sds-size-space-200) py-(--sds-size-space-200) rounded-(--sds-size-radius-200)",
        "text-(length:--sds-typography-body-size-medium) font-(--sds-typography-body-font-weight-regular) whitespace-nowrap",
        isActive
          ? "bg-(--sds-color-background-brand-tertiary) text-(--sds-color-text-brand-on-brand-secondary)"
          : "text-(--sds-color-text-default-default)",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
