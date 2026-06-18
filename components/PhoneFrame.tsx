import Image from "next/image";

// App screenshot in dark phone chrome. Raw frames are 1206×2622 (iPhone 17 Pro).
export default function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
  width = 300,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
}) {
  const height = Math.round((width * 2622) / 1206);
  return (
    <div className={`phone ${className}`} style={{ width }}>
      <Image
        src={src}
        alt={alt}
        width={1206}
        height={2622}
        priority={priority}
        sizes={`${width}px`}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
