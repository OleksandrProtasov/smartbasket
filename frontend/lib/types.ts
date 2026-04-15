export type Product = {
  id: string;
  externalId?: number;
  localId?: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  category: string;
  stock: number;
  source: "external" | "local";
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    source?: string;
  };
};

export type CartItem = Product & {
  quantity: number;
};
