import ApiService from "./ApiService";
import ApiProduct from "./moduls/product";
export const $api = {
  common: new ApiService(),
  product: new ApiProduct(),
};
