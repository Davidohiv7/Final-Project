import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "white",
      height: '100%',
    },
  },

  container: {
    width: 750,
    height: 500,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },

  height100: {
    height: "100%",
  },
  heightCardMedia: {
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export default useStyles;
