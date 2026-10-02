import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import type { ImgHTMLAttributes } from "react";

afterEach(() => cleanup());

// next/image needs the Next runtime config; a plain <img> is enough for unit tests.
vi.mock("next/image", () => ({
  default: (allProps: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; preload?: boolean }) => {
    const props = { ...allProps };
    delete props.fill;
    delete props.preload;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// jsdom has no IntersectionObserver (used by motion's whileInView).
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
