import { useCallback, useMemo } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Column, Order } from "./type";

interface Props<T> {
  onSort: (column: Column<T>) => void;
  order: Order;
  orderBy: string;
  columns: Column<T>[];
}

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  })
);

export const EnhancedTableHead = <T extends Record<string, any>>(
  props: Props<T>
): JSX.Element => {
  const { order, orderBy, onSort, columns } = props;
  const classes = useStyles();
  const onClick = useCallback((column: Column<T>) => () => onSort(column), [
    onSort
  ]);
  const cells = useMemo(
    () =>
      columns.map(col => (
        <TableCell
          key={col.id}
          align={col.numeric ? "right" : "left"}
          padding="default"
          sortDirection={orderBy === col.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === col.id}
            direction={orderBy === col.id ? order : "asc"}
            onClick={onClick(col)}
          >
            {col.label}
            {orderBy === col.id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      )),
    [classes.visuallyHidden, columns, onClick, order, orderBy]
  );
  return (
    <TableHead>
      <TableRow>{cells}</TableRow>
    </TableHead>
  );
};
