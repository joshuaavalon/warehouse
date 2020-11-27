import { ChangeEvent, useCallback } from "react";
import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Add, CloudUpload } from "@material-ui/icons";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: "1 1 100%"
    },
    input: {
      display: "none"
    }
  })
);

interface Props {
  title: string;
  onAdd?: () => void;
  onUpload?: (file: File) => void;
}

export const EnhancedTableToolbar = (props: Props): JSX.Element => {
  const { title, onAdd, onUpload } = props;
  const classes = useStyles();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) {
        return;
      }
      const file = files[0];
      onUpload?.(file);
    },
    [onUpload]
  );
  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" component="div">
        {title}
      </Typography>
      <input
        id={title}
        accept=".csv"
        className={classes.input}
        multiple
        type="file"
        onChange={onChange}
      />
      <Tooltip title="Upload">
        <label htmlFor={title}>
          <IconButton component="span">
            <CloudUpload />
          </IconButton>
        </label>
      </Tooltip>
      <Tooltip title="Add">
        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
