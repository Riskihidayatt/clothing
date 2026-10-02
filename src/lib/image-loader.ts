"use client";

type LoaderParams = { src: string; width: number; quality?: number };

/**
 * Builds a resized image URL. Unsplash URLs get CDN resize params;
 * local files (`/images/...`) are returned as-is.
 */
export default function imageLoader({ src, width, quality }: LoaderParams) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    return url.toString();
  }
  return src;
}
