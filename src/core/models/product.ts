export interface IProduct extends IProductPost {
  id: number;
}

export interface IProductBody {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProductPost {
  id?: number;
  title: string;
  description: string;
  price: number | null;
  stock: number | null;
  brand: string;
  category: string;
  images: string[];
  view: boolean;
}
