import { useCallback, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  createStorage,
  deleteStorage,
  getStorages,
  Storage,
  updateStorage,
  useStorage,
  useStorageLoading
} from "@/store/storage";
import { Column, EnhancedTable } from "@/component/enhancedTable";
import { ApiResponse, ApiStorage, StorageApi } from "@/api";
import { useAppDispatch } from "@/store";

import { StorageTableDialog } from "./storageTableDialog";

const columns: Column<Storage>[] = [
  {
    id: "locationCode",
    numeric: false,
    label: "Location Code"
  },
  {
    id: "locationName",
    numeric: false,
    label: "Location Name"
  },
  {
    id: "productCode",
    numeric: false,
    label: "Storage Code"
  },
  {
    id: "productName",
    numeric: false,
    label: "Storage Name"
  },
  { id: "amount", numeric: true, label: "Amount" }
];

export const StorageTable = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStorages());
  }, [dispatch]);
  const data = useStorage();
  const loading = useStorageLoading();
  const [showModal, setShowModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Storage | undefined>();
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
    (storage: Storage) => {
      setDefaultValues(storage);
      setShowModal(true);
    },
    [setShowModal]
  );
  const onSubmit = useCallback(
    async (value: Omit<Storage, "id">) => {
      const { id } = defaultValues || {};
      let promise: Promise<ApiResponse<ApiStorage>>;
      if (id) {
        promise = dispatch(updateStorage({ ...value, id })).then(unwrapResult);
      } else {
        promise = dispatch(createStorage(value)).then(unwrapResult);
      }
      try {
        await promise;
        await dispatch(getStorages()).then(unwrapResult);
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
        await dispatch(deleteStorage(defaultValues)).then(unwrapResult);
        await dispatch(getStorages()).then(unwrapResult);
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
        await StorageApi.uploadStorage(file);
        await dispatch(getStorages()).then(unwrapResult);
      } catch {
        // TODO
        console.log("Failed Upload");
      }
    },
    [dispatch]
  );
  return (
    <>
      <EnhancedTable<Storage>
        title="Storage"
        keyField="id"
        defaultOrderBy="locationCode"
        data={data}
        columns={columns}
        onAdd={onModalOpen}
        onClick={onItemClick}
        onUpload={onUpload}
      />
      <StorageTableDialog
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
