import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    id: 1,
    quote:
      "This design system has completely transformed our workflow. The consistency across our products is unmatched.",
    authorName: "Alex Johnson",
    authorTitle: "Product Designer",
  },
  {
    id: 2,
    quote:
      "Incredible attention to detail. Every component feels polished and works seamlessly right out of the box.",
    authorName: "Maria Garcia",
    authorTitle: "Frontend Engineer",
  },
  {
    id: 3,
    quote:
      "Our team's velocity doubled after adopting this system. Design and development finally speak the same language.",
    authorName: "James Lee",
    authorTitle: "Engineering Manager",
  },
  {
    id: 4,
    quote:
      "The token system is exactly what we needed. Theming across multiple brands has never been this straightforward.",
    authorName: "Sophie Martin",
    authorTitle: "Design Lead",
  },
  {
    id: 5,
    quote:
      "Accessibility is baked in from the start. We stopped worrying about compliance and started focusing on features.",
    authorName: "David Kim",
    authorTitle: "UX Researcher",
  },
  {
    id: 6,
    quote:
      "The documentation is clear and the components are flexible enough to handle every edge case we've encountered.",
    authorName: "Priya Patel",
    authorTitle: "Full Stack Developer",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-(--sds-color-background-default-default) flex flex-col gap-(--sds-size-space-1200) p-(--sds-size-space-600) lg:p-(--sds-size-space-1600)">
      <div className="flex flex-col gap-(--sds-size-space-200)">
        <h2 className="text-(--sds-color-text-default-default) text-(length:--sds-typography-heading-size-base) font-(--sds-typography-heading-font-weight) leading-[1.2] tracking-[-0.02em]">
          What people are saying
        </h2>
        <p className="text-(--sds-color-text-default-secondary) text-(length:--sds-typography-subheading-size-medium) font-(--sds-typography-subheading-font-weight) leading-[1.2]">
          Trusted by designers and engineers worldwide
        </p>
      </div>
      <div className="flex flex-wrap gap-(--sds-size-space-600) lg:gap-(--sds-size-space-1200) items-start">
        {testimonials.map((item) => (
          <TestimonialCard
            key={item.id}
            quote={item.quote}
            authorName={item.authorName}
            authorTitle={item.authorTitle}
          />
        ))}
      </div>
    </section>
  );
}
