import ApiService from "../ApiService";
import type {
  IProduct,
  IProductBody,
  IProductPost,
} from "@/core/models/product";
export default class ApiProduct extends ApiService {
  getAll(query?: any): Promise<IProductBody> {
    return ApiService.getAll("/products", { params: query }).then((res) => {
      return res.data;
    });
  }

  getAllBySearching(query?: any): Promise<IProductBody> {
    return ApiService.getAll("/products/search", { params: query }).then(
      (res) => {
        return res.data;
      },
    );
  }

  getAllByCategory(param: string): Promise<IProductBody> {
    return ApiService.getAll(`/products/category/${param}`, {}).then((res) => {
      return res.data;
    });
  }

  getCategories(): Promise<string[]> {
    return ApiService.getAll("/products/categories", {}).then(
      (res) => res.data,
    );
  }

  create(payload: IProductPost) {
    ApiService.setHeader();
    return ApiService.post("/products/add", payload).then((res) => {
      return res.data;
    });
  }

  update(payload: IProductPost) {
    ApiService.setHeader();
    const id = payload.id;
    delete payload.id;
    return ApiService.update("/products", `${id}`, payload).then((res) => {
      return res.data;
    });
  }

  delete(id: number) {
    ApiService.setHeader();
    return ApiService.delete(`/products/${id}`).then((res) => {
      return res.data;
    });
  }
}
