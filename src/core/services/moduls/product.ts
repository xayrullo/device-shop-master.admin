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
    return ApiService.post("/products", { data: payload }).then((res) => {
      return res.data;
    });
  }

  update(payload: IProductPost) {
    ApiService.setHeader();
    return ApiService.update("/products", `${payload.id}`, {
      data: payload,
    }).then((res) => {
      return res.data;
    });
  }

  delete(payload: IProduct) {
    ApiService.setHeader();
    return ApiService.delete(`/products/${payload.id}`).then((res) => {
      return res.data;
    });
  }
}
