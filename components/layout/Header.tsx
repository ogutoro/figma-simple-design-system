import Image from "next/image";
import Button from "@/components/ui/Button";
import NavigationPill from "@/components/ui/NavigationPill";

const navItems = [
  { href: "/", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/community", label: "Community" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-(--sds-color-background-default-default) border-b border-(--sds-color-border-default-default) flex items-center justify-between p-(--sds-size-space-600) lg:gap-(--sds-size-space-600) lg:p-(--sds-size-space-800) w-full">
      {/* ロゴ */}
      <div className="shrink-0">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={40}
          height={35}
          priority
          unoptimized
        />
      </div>

      {/* ナビゲーション（デスクトップのみ） */}
      <nav className="hidden lg:flex flex-1 flex-wrap items-center justify-end gap-(--sds-size-space-200) min-w-0">
        {navItems.map((item) => (
          <NavigationPill key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>

      {/* 認証ボタン（デスクトップのみ） */}
      <div className="hidden lg:flex items-center gap-(--sds-size-space-300) w-44.5 shrink-0">
        <Button variant="secondary" href="/signin" className="flex-1 min-w-0">Sign in</Button>
        <Button variant="primary" href="/register" className="flex-1 min-w-0">Register</Button>
      </div>

      {/* ハンバーガーボタン（モバイルのみ） */}
      <button
        type="button"
        aria-label="メニューを開く"
        className="flex lg:hidden items-center justify-center p-(--sds-size-space-200) rounded-full"
      >
        <Image
          src="/images/menu-icon.svg"
          alt=""
          width={20}
          height={20}
          unoptimized
        />
      </button>
    </header>
  );
}
