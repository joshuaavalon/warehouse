import { useCallback, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  createProduct,
  deleteProduct,
  getProducts,
  Product,
  updateProduct,
  useProduct,
  useProductLoading
} from "@/store/product";
import { getStorages } from "@/store/storage";
import { Column, EnhancedTable } from "@/component/enhancedTable";
import { ApiProduct, ApiResponse, StorageApi } from "@/api";
import { useAppDispatch } from "@/store";

import { ProductTableDialog } from "./productTableDialog";

const columns: Column<Product>[] = [
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

export const ProductTable = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const data = useProduct();
  const loading = useProductLoading();
  const [showModal, setShowModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Product | undefined>();
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
    (product: Product) => {
      setDefaultValues(product);
      setShowModal(true);
    },
    [setShowModal]
  );
  const onSubmit = useCallback(
    async (value: Omit<Product, "id">) => {
      const { id } = defaultValues || {};
      let promise: Promise<ApiResponse<ApiProduct>>;
      if (id) {
        promise = dispatch(updateProduct({ ...value, id })).then(unwrapResult);
      } else {
        promise = dispatch(createProduct(value)).then(unwrapResult);
      }
      try {
        await promise;
        await Promise.all([
          dispatch(getProducts()).then(unwrapResult),
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
        await dispatch(deleteProduct(defaultValues)).then(unwrapResult);
        await Promise.all([
          dispatch(getProducts()).then(unwrapResult),
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
        await StorageApi.uploadProduct(file);
        await Promise.all([
          dispatch(getProducts()).then(unwrapResult),
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
      <EnhancedTable<Product>
        title="Product"
        keyField="id"
        defaultOrderBy="code"
        data={data}
        columns={columns}
        onAdd={onModalOpen}
        onClick={onItemClick}
        onUpload={onUpload}
      />
      <ProductTableDialog
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
