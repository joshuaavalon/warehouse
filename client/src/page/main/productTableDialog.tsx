import { useEffect, useMemo } from "react";
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
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Product } from "@/store/product";

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
  onSubmit: (value: Omit<Product, "id">) => void;
  onDelete?: () => void;
  open: boolean;
  onClose?: () => void;
  defaultValues?: Omit<Product, "id">;
  loading?: boolean;
}

export const ProductTableDialog = (props: Props): JSX.Element => {
  const { onSubmit, open, onClose, defaultValues, loading, onDelete } = props;
  const { register, handleSubmit, errors, reset } = useForm({ defaultValues });
  const title = useMemo(
    () => (defaultValues ? "Edit Product" : "New Product"),
    [defaultValues]
  );
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form autoComplete="off">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes.formItem}>
            <TextField
              required
              className={classes.formInput}
              error={Boolean(errors.code)}
              name="code"
              label="Code"
              variant="outlined"
              inputRef={register({ required: true })}
            />
          </div>
          <div className={classes.formItem}>
            <TextField
              required
              className={classes.formInput}
              error={Boolean(errors.name)}
              name="name"
              label="Name"
              variant="outlined"
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
