import { useCallback, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  createLocation,
  deleteLocation,
  getLocations,
  Location,
  updateLocation,
  useLocation,
  useLocationLoading
} from "@/store/location";
import { getStorages } from "@/store/storage";
import { Column, EnhancedTable } from "@/component/enhancedTable";
import { ApiLocation, ApiResponse, StorageApi } from "@/api";
import { useAppDispatch } from "@/store";

import { LocationTableDialog } from "./locationTableDialog";

const columns: Column<Location>[] = [
  {
    id: "code",
    numeric: false,
    label: "Code"
  },
  {
    id: "name",
    numeric: false,
    label: "Name"
  }
];

export const LocationTable = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);
  const data = useLocation();
  const loading = useLocationLoading();
  const [showModal, setShowModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Location | undefined>();
  const onModalClose = useCallback(() => {
    if (!loading) {
      setShowModal(false);
    }
  }, [loading, setShowModal]);
  const onModalOpen = useCallback(() => {
    setDefaultValues(undefined);
    setShowModal(true);
  }, [setShowModal]);
  const onItemClick = useCallback(
    (location: Location) => {
      setDefaultValues(location);
      setShowModal(true);
    },
    [setShowModal]
  );
  const onSubmit = useCallback(
    async (value: Omit<Location, "id">) => {
      const { id } = defaultValues || {};
      let promise: Promise<ApiResponse<ApiLocation>>;
      if (id) {
        promise = dispatch(updateLocation({ ...value, id })).then(unwrapResult);
      } else {
        promise = dispatch(createLocation(value)).then(unwrapResult);
      }
      try {
        await promise;
        await Promise.all([
          dispatch(getLocations()).then(unwrapResult),
          dispatch(getStorages()).then(unwrapResult)
        ]);
        setShowModal(false);
      } catch {
        // TODO
        console.log("Failed API request");
      }
    },
    [dispatch, defaultValues, setShowModal]
  );
  const onDelete = useCallback(async () => {
    if (defaultValues) {
      try {
        await dispatch(deleteLocation(defaultValues)).then(unwrapResult);
        await Promise.all([
          dispatch(getLocations()).then(unwrapResult),
          dispatch(getStorages()).then(unwrapResult)
        ]);
        setShowModal(false);
      } catch {
        // TODO
        console.log("Failed API request");
      }
    }
  }, [dispatch, defaultValues, setShowModal]);
  const onUpload = useCallback(
    async (file: File) => {
      try {
        await StorageApi.uploadLocation(file);
        await Promise.all([
          dispatch(getLocations()).then(unwrapResult),
          dispatch(getStorages()).then(unwrapResult)
        ]);
      } catch {
        // TODO
        console.log("Failed Upload");
      }
    },
    [dispatch]
  );
  return (
    <>
      <EnhancedTable<Location>
        title="Location"
        keyField="id"
        defaultOrderBy="code"
        data={data}
        columns={columns}
        onAdd={onModalOpen}
        onClick={onItemClick}
        onUpload={onUpload}
      />
      <LocationTableDialog
        open={showModal}
        onClose={onModalClose}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        onDelete={onDelete}
      />
    </>
  );
};
