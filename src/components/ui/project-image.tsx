import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export function ProjectImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}: ProjectImageProps) {
  return (
    <div
      className={[
        "relative overflow-hidden bg-ink",
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        data-monochrome="true"
        className="h-full w-full object-cover transition-[filter,transform] duration-700 ease-[var(--ease-site)] hover:scale-[1.015] hover:grayscale-0"
      />
    </div>
  );
}