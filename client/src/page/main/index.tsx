import { createStyles, makeStyles } from "@material-ui/core/styles";

import { StorageTable } from "./storageTable";
import { ProductTable } from "./productTable";
import { LocationTable } from "./locationTable";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      height: "100vh",
      maxWidth: "100%"
    },
    container: {
      padding: theme.spacing(2)
    }
  })
);

export const MainPage = (): JSX.Element => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <StorageTable />
        <ProductTable />
        <LocationTable />
      </div>
    </section>
  );
};
