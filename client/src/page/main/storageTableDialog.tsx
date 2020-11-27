import { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { Delete, Send } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Storage } from "@/store/storage";
import { Location, useLocation } from "@/store/location";
import { Product, useProduct } from "@/store/product";

const useStyles = makeStyles(theme =>
  createStyles({
    formItem: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    formInput: {
      width: "100%"
    }
  })
);

interface Props {
  onSubmit: (value: Omit<Storage, "id">) => void;
  onDelete?: () => void;
  open: boolean;
  onClose?: () => void;
  defaultValues?: Omit<Storage, "id">;
  loading?: boolean;
}

export const StorageTableDialog = (props: Props): JSX.Element => {
  const { onSubmit, open, onClose, defaultValues, loading, onDelete } = props;
  const { register, handleSubmit, errors, reset, setValue } = useForm({
    defaultValues
  });

  const title = useMemo(
    () => (defaultValues ? "Edit Storage" : "New Storage"),
    [defaultValues]
  );
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  const locations = useLocation();
  const products = useProduct();
  const classes = useStyles();
  useEffect(() => {
    register({ name: "locationName" }, { required: true });
    register({ name: "locationCode" }, { required: true });
    register({ name: "locationId" }, { required: true });
    register({ name: "productName" }, { required: true });
    register({ name: "productCode" }, { required: true });
    register({ name: "productId" }, { required: true });
  }, [register]);
  const onLocationChange = useCallback(
    (_e: ChangeEvent<unknown>, location: Location | null) => {
      setValue("locationName", location?.name);
      setValue("locationCode", location?.code);
      setValue("locationId", location?.id);
    },
    [setValue]
  );
  const onProductChange = useCallback(
    (_e: ChangeEvent<unknown>, product: Product | null) => {
      setValue("productName", product?.name);
      setValue("productCode", product?.code);
      setValue("productId", product?.id);
    },
    [setValue]
  );
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form autoComplete="off">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes.formItem}>
            {defaultValues ? (
              <TextField
                className={classes.formInput}
                required
                disabled
                name="locationName"
                label="Location Name"
                variant="outlined"
                inputRef={register({ required: true })}
              />
            ) : (
              <Autocomplete
                className={classes.formInput}
                options={locations}
                getOptionLabel={opt => `(${opt.code}) ${opt.name}`}
                onChange={onLocationChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    required
                    error={Boolean(errors.locationName)}
                    name="locationName"
                    label="Location Name"
                    variant="outlined"
                  />
                )}
              />
            )}
          </div>
          <div className={classes.formItem}>
            {defaultValues ? (
              <TextField
                className={classes.formInput}
                required
                disabled
                name="productName"
                label="Product Name"
                variant="outlined"
                inputRef={register({ required: true })}
              />
            ) : (
              <Autocomplete
                className={classes.formInput}
                options={products}
                getOptionLabel={opt => `(${opt.code}) ${opt.name}`}
                onChange={onProductChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    required
                    error={Boolean(errors.productName)}
                    name="productName"
                    label="Product Name"
                    variant="outlined"
                  />
                )}
              />
            )}
          </div>
          <div className={classes.formItem}>
            <TextField
              className={classes.formInput}
              required
              error={Boolean(errors.amount)}
              name="amount"
              label="Amount"
              variant="outlined"
              type="number"
              inputRef={register({ required: true })}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {defaultValues ? (
            <Button
              startIcon={loading ? <CircularProgress size={24} /> : <Delete />}
              onClick={onDelete}
              color="secondary"
              variant="contained"
              disabled={loading}
            >
              Delete
            </Button>
          ) : null}
          <Button
            startIcon={loading ? <CircularProgress size={24} /> : <Send />}
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
