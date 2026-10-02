export type Testimonial = {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dimas A.",
    city: "Jakarta",
    product: "Static Heavyweight Hoodie",
    rating: 5,
    quote: "Bahannya tebel parah tapi tetep adem. Cutting-nya boxy pas, dipake ke mana aja langsung dapet compliment.",
  },
  {
    id: "t2",
    name: "Alya P.",
    city: "Bandung",
    product: "NOISE Boxy Tee",
    rating: 5,
    quote: "Sablonnya awet, udah dicuci 20x masih crisp. Fix langganan tiap drop, no debat.",
  },
  {
    id: "t3",
    name: "Rizky M.",
    city: "Surabaya",
    product: "Transit Cargo Pants",
    rating: 4,
    quote: "Kantongnya banyak & fungsional. Pengiriman cepet, packaging-nya juga niat banget.",
  },
  {
    id: "t4",
    name: "Tasya R.",
    city: "Yogyakarta",
    product: "Night Shift Coach Jacket",
    rating: 5,
    quote: "Telat 5 menit pas drop kemarin langsung sold out. Untung udah join club, dapet early access. Worth it!",
  },
];
