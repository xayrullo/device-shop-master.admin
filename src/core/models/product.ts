export interface IProduct extends IProductPost {
  id: number;
  createdAt: string;
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
  price: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  view: boolean;
}
