import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: "#", src: "/images/icon-x.svg", alt: "X (Twitter)", width: 24, height: 24 },
  { href: "#", src: "/images/icon-instagram.svg", alt: "Instagram", width: 24, height: 24 },
  { href: "#", src: "/images/icon-youtube.svg", alt: "YouTube", width: 24, height: 24 },
  { href: "#", src: "/images/icon-linkedin.svg", alt: "LinkedIn", width: 24, height: 24 },
];

const linkColumns = [
  {
    title: "Use cases",
    links: [
      "UI design",
      "UX design",
      "Wireframing",
      "Diagramming",
      "Brainstorming",
      "Online whiteboard",
      "Team collaboration",
    ],
  },
  {
    title: "Explore",
    links: [
      "Design",
      "Prototyping",
      "Development features",
      "Design systems",
      "Collaboration features",
      "Design process",
      "FigJam",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Best practices",
      "Colors",
      "Color wheel",
      "Support",
      "Developers",
      "Resource library",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-(--sds-color-background-default-default) border-t border-(--sds-color-border-default-default) flex flex-col gap-(--sds-size-space-1600) p-(--sds-size-space-800) lg:flex-row lg:gap-(--sds-size-space-400) lg:pb-40">
      {/* ロゴ + ソーシャルリンク */}
      <div className="flex w-full items-center justify-between shrink-0 lg:w-[262px] lg:flex-col lg:items-start lg:justify-start lg:gap-(--sds-size-space-600)">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={35}
          height={35}
          unoptimized
        />
        <div className="flex items-center gap-(--sds-size-space-400)">
          {socialLinks.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              aria-label={social.alt}
              className="shrink-0"
            >
              <Image
                src={social.src}
                alt=""
                width={social.width}
                height={social.height}
                unoptimized
              />
            </a>
          ))}
        </div>
      </div>

      {/* リンクカラム */}
      <div className="flex flex-col gap-(--sds-size-space-600) items-start w-full lg:flex-row lg:flex-1 lg:min-w-0 lg:gap-(--sds-size-space-400)">
        {linkColumns.map((column) => (
          <div
            key={column.title}
            className="flex flex-col gap-(--sds-size-space-200) items-start w-full lg:flex-1 lg:min-w-0 lg:gap-(--sds-size-space-300)"
          >
            <p className="font-semibold text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) leading-[1.4] pb-(--sds-size-space-100) lg:pb-(--sds-size-space-400)">
              {column.title}
            </p>
            <ul className="flex flex-col gap-(--sds-size-space-200) items-start lg:gap-(--sds-size-space-300)">
              {column.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-(length:--sds-typography-body-size-medium) text-(--sds-color-text-default-default) leading-[1.4] font-normal"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
