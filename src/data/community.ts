import { unsplash } from "./images";

export type CommunityPost = {
  id: string;
  handle: string;
  src: string;
  alt: string;
  likes: number;
};

export const communityPosts: CommunityPost[] = [
  { id: "ugc-1", handle: "@rakaaa.fit", src: unsplash("1506794778202-cad84cf45f1d"), alt: "Pelanggan pria memakai kaos hitam KALCER", likes: 1240 },
  { id: "ugc-2", handle: "@nadyns", src: unsplash("1494790108377-be9c29b29330"), alt: "Pelanggan perempuan tersenyum memakai outfit kasual", likes: 982 },
  { id: "ugc-3", handle: "@bimz.archive", src: unsplash("1500648767791-00dcc994a43e"), alt: "Pelanggan pria dengan potret close-up", likes: 2310 },
  { id: "ugc-4", handle: "@salsabila.ootd", src: unsplash("1534528741775-53994a69daeb"), alt: "Pelanggan perempuan berpose untuk foto OOTD", likes: 1875 },
  { id: "ugc-5", handle: "@gilang.wav", src: unsplash("1517841905240-472988babdf9"), alt: "Pelanggan dengan outfit layering di luar ruangan", likes: 764 },
  { id: "ugc-6", handle: "@kei.jpg", src: unsplash("1469334031218-e382a71b716b"), alt: "Pelanggan perempuan dengan outfit streetwear di jalan", likes: 3021 },
];
