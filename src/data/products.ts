import { unsplash } from "./images";

export type ProductCategory = "tops" | "outerwear" | "bottoms" | "accessories";
export type ProductBadge = "new" | "sold-out" | "low-stock";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  badge?: ProductBadge;
  /** front view */
  image: string;
  /** back / alternate view, shown on hover */
  imageAlt: string;
  alt: string;
};

export const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tops", label: "Tops" },
  { value: "outerwear", label: "Outerwear" },
  { value: "bottoms", label: "Bottoms" },
  { value: "accessories", label: "Acc" },
];

export const products: Product[] = [
  {
    id: "noise-boxy-tee",
    name: "NOISE Boxy Tee — Black",
    category: "tops",
    price: 189_000,
    badge: "new",
    image: unsplash("1583743814966-8936f5b7be1a"),
    imageAlt: unsplash("1576566588028-4147f3842f27"),
    alt: "Kaos boxy hitam dengan grafis NOISE",
  },
  {
    id: "static-hoodie",
    name: "Static Heavyweight Hoodie",
    category: "tops",
    price: 459_000,
    badge: "new",
    image: unsplash("1556821840-3a63f95609a7"),
    imageAlt: unsplash("1620799140408-edc6dcb6d633"),
    alt: "Hoodie heavyweight hitam oversized",
  },
  {
    id: "night-shift-jacket",
    name: "Night Shift Coach Jacket",
    category: "outerwear",
    price: 649_000,
    badge: "sold-out",
    image: unsplash("1591047139829-d91aecb6caea"),
    imageAlt: unsplash("1551028719-00167b16eac5"),
    alt: "Coach jacket hitam dengan detail kancing snap",
  },
  {
    id: "transit-cargo",
    name: "Transit Cargo Pants",
    category: "bottoms",
    price: 429_000,
    badge: "low-stock",
    image: unsplash("1624378439575-d8705ad7ae80"),
    imageAlt: unsplash("1542272604-787c3835535d"),
    alt: "Celana kargo abu gelap dengan banyak kantong",
  },
  {
    id: "club-tee-bone",
    name: "Kalcer Club Tee — Bone",
    category: "tops",
    price: 199_000,
    image: unsplash("1521572163474-6864f9cf17ab"),
    imageAlt: unsplash("1503341504253-dff4815485f1"),
    alt: "Kaos off-white dengan logo kecil di dada",
  },
  {
    id: "rebel-varsity",
    name: "Rebel Varsity Jacket",
    category: "outerwear",
    price: 749_000,
    badge: "new",
    image: unsplash("1559551409-dadc959f76b8"),
    imageAlt: unsplash("1548126032-079a0fb0099d"),
    alt: "Jaket varsity hitam dengan aksen lengan kontras",
  },
  {
    id: "washed-cap",
    name: "Washed 6-Panel Cap",
    category: "accessories",
    price: 159_000,
    badge: "sold-out",
    image: unsplash("1588850561407-ed78c282e89b"),
    imageAlt: unsplash("1575428652377-a2d80e2277fc"),
    alt: "Topi 6-panel washed black dengan bordir logo",
  },
  {
    id: "loud-tote",
    name: "LOUD Canvas Tote",
    category: "accessories",
    price: 129_000,
    image: unsplash("1544816155-12df9643f363"),
    imageAlt: unsplash("1591561954557-26941169b49e"),
    alt: "Tote bag kanvas dengan sablon tulisan LOUD",
  },
];
