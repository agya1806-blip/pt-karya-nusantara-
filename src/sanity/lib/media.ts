import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

export function processImage(
  image: SanityImageObject | null | undefined,
  width = 800,
  height?: number,
  format: "jpg" | "webp" | "png" = "webp",
): { src: string; alt: string } | null {
  if (!image) return null;
  const { asset, alt } = image as SanityImageObject & { alt?: string };
  if (!asset?._ref) return null;
  return {
    src: asset._ref,
    alt: alt || "",
  };
}
