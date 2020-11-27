import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { StorageApi } from "@/api";

import { Storage } from "./model";

export const getStorages = createAsyncThunk("storage/getStorages", async () => {
  const response = await StorageApi.getStorages();
  return response.data;
});

export const updateStorage = createAsyncThunk(
  "storage/updateStorage",
  async (storage: Storage) => {
    const {
      id,
      amount,
      productName,
      productId,
      productCode,
      locationCode,
      locationId,
      locationName
    } = storage;
    const reqStorage = {
      id,
      amount,
      product: { id: productId, name: productName, code: productCode },
      location: { id: locationId, name: locationName, code: locationCode }
    };
    const response = await StorageApi.updateStorage(reqStorage);
    return response.data;
  }
);

export const createStorage = createAsyncThunk(
  "storage/createStorage",
  async (storage: Omit<Storage, "id">) => {
    const {
      amount,
      productName,
      productId,
      productCode,
      locationCode,
      locationId,
      locationName
    } = storage;
    const reqStorage = {
      amount,
      product: { id: productId, name: productName, code: productCode },
      location: { id: locationId, name: locationName, code: locationCode }
    };
    const response = await StorageApi.createStorage(reqStorage);
    return response.data;
  }
);

export const deleteStorage = createAsyncThunk(
  "storage/deleteStorage",
  async (storage: Storage) => {
    const {
      id,
      amount,
      productName,
      productId,
      productCode,
      locationCode,
      locationId,
      locationName
    } = storage;
    const reqStorage = {
      id,
      amount,
      product: { id: productId, name: productName, code: productCode },
      location: { id: locationId, name: locationName, code: locationCode }
    };
    const response = await StorageApi.deleteStorage(reqStorage);
    return response.data;
  }
);

const storageSlice = createSlice({
  name: "storage",
  initialState: { data: [] as Storage[], loading: false },
  reducers: {
    setStorage(state, action: PayloadAction<Storage[]>) {
      return { ...state, data: action.payload };
    }
  },
  extraReducers: builder => {
    builder.addCase(getStorages.pending, state => {
      state.loading = true;
    });
    builder.addCase(getStorages.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data.map(
        ({ id, amount, product, location }) => ({
          id,
          amount,
          productId: product.id,
          productCode: product.code,
          productName: product.name,
          locationId: location.id,
          locationCode: location.code,
          locationName: location.name
        })
      );
    });
    builder.addCase(getStorages.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateStorage.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateStorage.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateStorage.rejected, state => {
      state.loading = false;
    });
    builder.addCase(createStorage.pending, state => {
      state.loading = true;
    });
    builder.addCase(createStorage.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(createStorage.rejected, state => {
      state.loading = false;
    });
    builder.addCase(deleteStorage.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteStorage.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(deleteStorage.rejected, state => {
      state.loading = false;
    });
  }
});

export const useStorage = (): Storage[] =>
  useSelector(state => state.storage.data);

export const useStorageLoading = (): boolean =>
  useSelector(state => state.storage.loading);

export const { setStorage } = storageSlice.actions;
export default storageSlice.reducer;
export { Storage } from "./model";
