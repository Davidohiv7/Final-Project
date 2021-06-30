import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: 20,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: "88%",
    },
  },
  logo: {
    [theme.breakpoints.down('xs')]: {
      display: "none"
    },
  },
  boxResponsive: {
    [theme.breakpoints.down('xs')]: {
      display: "none"
    },
  }
}));

export default useStyles;
