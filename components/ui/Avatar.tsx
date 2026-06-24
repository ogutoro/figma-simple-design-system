import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
}

export default function Avatar({ src, alt = "" }: AvatarProps) {
  return (
    <div className="relative size-10 shrink-0 rounded-full overflow-hidden bg-(--sds-color-background-neutral-tertiary)">
      {src && <Image src={src} alt={alt} fill className="object-cover" />}
    </div>
  );
}
