import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { StorageApi } from "@/api";

import { Product } from "./model";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await StorageApi.getProducts();
  return response.data;
});

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: Product) => {
    const response = await StorageApi.updateProduct(product);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product: Omit<Product, "id">) => {
    const response = await StorageApi.createProduct(product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (product: Product) => {
    const response = await StorageApi.deleteProduct(product);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { data: [] as Product[], loading: false },
  reducers: {
    setProduct(state, action: PayloadAction<Product[]>) {
      return { ...state, data: action.payload };
    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getProducts.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, state => {
      state.loading = false;
    });
    builder.addCase(createProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, state => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, state => {
      state.loading = false;
    });
  }
});

export const useProduct = (): Product[] =>
  useSelector(state => state.product.data);
export const useProductLoading = (): boolean =>
  useSelector(state => state.product.loading);
export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
export { Product } from "./model";
