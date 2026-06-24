export default function ImgSection() {
  return (
    <section className="w-full h-100 flex items-center justify-center bg-(--sds-color-background-neutral-tertiary)">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
        aria-hidden
      >
        <rect x="4" y="4" width="152" height="152" rx="24" stroke="#1e1e1e" strokeWidth="8" />
        <circle cx="108" cy="56" r="16" stroke="#1e1e1e" strokeWidth="8" />
        <path
          d="M8 120L50 72L80 104L108 72L152 120"
          stroke="#1e1e1e"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </section>
  );
}
