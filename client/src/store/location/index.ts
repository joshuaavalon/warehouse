import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { StorageApi } from "@/api";

import { Location } from "./model";

export const getLocations = createAsyncThunk(
  "location/getLocations",
  async () => {
    const response = await StorageApi.getLocations();
    return response.data;
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (location: Location) => {
    const response = await StorageApi.updateLocation(location);
    return response.data;
  }
);

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (location: Omit<Location, "id">) => {
    const response = await StorageApi.createLocation(location);
    return response.data;
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (location: Location) => {
    const response = await StorageApi.deleteLocation(location);
    return response.data;
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: { data: [] as Location[], loading: false },
  reducers: {
    setLocation(state, action: PayloadAction<Location[]>) {
      return { ...state, data: action.payload };
    }
  },
  extraReducers: builder => {
    builder.addCase(getLocations.pending, state => {
      state.loading = true;
    });
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getLocations.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateLocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateLocation.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateLocation.rejected, state => {
      state.loading = false;
    });
    builder.addCase(createLocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(createLocation.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(createLocation.rejected, state => {
      state.loading = false;
    });
    builder.addCase(deleteLocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteLocation.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(deleteLocation.rejected, state => {
      state.loading = false;
    });
  }
});

export const useLocation = (): Location[] =>
  useSelector(state => state.location.data);
export const useLocationLoading = (): boolean =>
  useSelector(state => state.location.loading);
export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
export { Location } from "./model";
