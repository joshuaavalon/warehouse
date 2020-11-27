import { useCallback, useMemo, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { EnhancedTableToolbar } from "./toolbar";
import { EnhancedTableHead } from "./head";
import { Column, Order } from "./type";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      width: "100%"
    }
  })
);

interface Props<T extends Record<string, any>> {
  title: string;
  data: T[];
  columns: Column<T>[];
  defaultOrderBy: keyof T & string;
  keyField: keyof T & string;
  onClick?: (value: T) => void;
  onAdd?: () => void;
  onUpload?: (file: File) => void;
}

export const EnhancedTable = <T extends Record<string, any>>(
  props: Props<T>
): JSX.Element => {
  const {
    data,
    columns,
    keyField,
    defaultOrderBy,
    onClick,
    title,
    onAdd,
    onUpload
  } = props;
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T & string>(defaultOrderBy);
  const onSort = useCallback(
    (column: Column<T>) => {
      const isAsc = orderBy === column.id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(column.id);
    },
    [order, orderBy]
  );
  const rows = useMemo(
    () =>
      _.sortBy(data, orderBy, order).map(value => {
        const cells = columns.map(col => (
          <TableCell key={col.id} align={col.numeric ? "right" : "left"}>
            {value[col.id]}
          </TableCell>
        ));
        return (
          <TableRow
            hover
            onClick={() => onClick?.(value)}
            key={value[keyField]}
          >
            {cells}
          </TableRow>
        );
      }),
    [data, order, orderBy, onClick, keyField, columns]
  );
  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar title={title} onAdd={onAdd} onUpload={onUpload} />
      <TableContainer>
        <Table className={classes.table} size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onSort={onSort}
            columns={columns}
          />
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export * from "./type";
