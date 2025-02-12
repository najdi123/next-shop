export type Review = {
  name: string;
  review: string;
  timestamp: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  sizes: string[];
  colors: string[];
  reviews: Review[];
};
