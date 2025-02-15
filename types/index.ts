export type Review = {
  name: string;
  review: string;
  timestamp: string;
};

export type ColorOption = {
  name: string;
  hex: string;
  image: string; // URL to the corresponding image
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: ColorOption[];
  reviews: Review[];
};
