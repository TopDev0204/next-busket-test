export interface productType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: Array<string>;
}

export interface responseType {
  limit: number;
  products: productType[];
  skip: number;
  total: number;
}
