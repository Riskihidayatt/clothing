import { unsplash } from "./images";

export type LookbookItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** grid span preset for the asymmetric layout */
  span: "tall" | "wide" | "square";
};

export const lookbook: LookbookItem[] = [
  {
    id: "look-01",
    src: unsplash("1552374196-1ab2a1c593e8"),
    alt: "Model pria berpose dengan outfit serba hitam di depan dinding beton",
    caption: "Look 01 — Static Hoodie",
    span: "tall",
  },
  {
    id: "look-02",
    src: unsplash("1515886657613-9f3515b0c78f"),
    alt: "Model perempuan memakai outer oversized di studio",
    caption: "Look 02 — Night Shift Jacket",
    span: "square",
  },
  {
    id: "look-03",
    src: unsplash("1529139574466-a303027c1d8b"),
    alt: "Dua model berdiri berdampingan dengan outfit streetwear",
    caption: "Look 03 — Club Tee + Transit Cargo",
    span: "wide",
  },
  {
    id: "look-04",
    src: unsplash("1509631179647-0177331693ae"),
    alt: "Model perempuan dengan setelan monokrom di bawah cahaya keras",
    caption: "Look 04 — Rebel Varsity",
    span: "square",
  },
  {
    id: "look-05",
    src: unsplash("1539109136881-3be0616acf4b"),
    alt: "Model berjalan di jalanan kota dengan outfit layering",
    caption: "Look 05 — Full Night Shift",
    span: "wide",
  },
];
