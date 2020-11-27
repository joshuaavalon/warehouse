import axios, { AxiosResponse } from "axios";

const instance = axios.create();

export interface ApiResponse<T> {
  data: T;
}

export interface ApiStorage {
  id: number;
  location: ApiLocation;
  product: ApiProduct;
  amount: number;
}

export interface ApiStorageRequest {
  id: number;
  location: Pick<ApiLocation, "id">;
  product: Pick<ApiProduct, "id">;
  amount: number;
}

export interface ApiLocation {
  id: number;
  code: string;
  name: string;
}

export interface ApiProduct {
  id: number;
  code: string;
  name: string;
}

export const StorageApi = {
  getStorages: async (): Promise<AxiosResponse<ApiResponse<ApiStorage[]>>> =>
    instance.get("/api/storage"),
  updateStorage: async (
    storage: ApiStorageRequest
  ): Promise<AxiosResponse<ApiResponse<ApiStorage>>> =>
    instance.put(`/api/storage/${storage.id}`, storage),
  createStorage: async (
    storage: Omit<ApiStorageRequest, "id">
  ): Promise<AxiosResponse<ApiResponse<ApiStorage>>> =>
    instance.post("/api/storage", storage),
  deleteStorage: async (
    storage: ApiStorageRequest
  ): Promise<AxiosResponse<ApiResponse<boolean>>> =>
    instance.delete(`/api/storage/${storage.id}`),
  uploadStorage: async (
    file: File
  ): Promise<AxiosResponse<ApiResponse<boolean>>> => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return instance.post("/api/storage/csv", formData, config);
  },
  getLocations: async (): Promise<AxiosResponse<ApiResponse<ApiLocation[]>>> =>
    instance.get("/api/location"),
  updateLocation: async (
    location: ApiLocation
  ): Promise<AxiosResponse<ApiResponse<ApiLocation>>> =>
    instance.put(`/api/location/${location.id}`, location),
  createLocation: async (
    location: Omit<ApiLocation, "id">
  ): Promise<AxiosResponse<ApiResponse<ApiLocation>>> =>
    instance.post("/api/location", location),
  deleteLocation: async (
    location: ApiLocation
  ): Promise<AxiosResponse<ApiResponse<boolean>>> =>
    instance.delete(`/api/location/${location.id}`),
  uploadLocation: async (
    file: File
  ): Promise<AxiosResponse<ApiResponse<boolean>>> => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return instance.post("/api/location/csv", formData, config);
  },
  getProducts: async (): Promise<AxiosResponse<ApiResponse<ApiProduct[]>>> =>
    instance.get("/api/product"),
  updateProduct: async (
    product: ApiProduct
  ): Promise<AxiosResponse<ApiResponse<ApiProduct>>> =>
    instance.put(`/api/product/${product.id}`, product),
  createProduct: async (
    product: Omit<ApiProduct, "id">
  ): Promise<AxiosResponse<ApiResponse<ApiProduct>>> =>
    instance.post("/api/product", product),
  deleteProduct: async (
    product: ApiProduct
  ): Promise<AxiosResponse<ApiResponse<boolean>>> =>
    instance.delete(`/api/product/${product.id}`),
  uploadProduct: async (
    file: File
  ): Promise<AxiosResponse<ApiResponse<boolean>>> => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return instance.post("/api/product/csv", formData, config);
  }
};
