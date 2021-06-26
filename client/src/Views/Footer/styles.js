import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: 20,
    minHeight: 20,
    bottom: 0,
    marginBottom: 0,
  },
  logo: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    boxShadow: "1px 3px 2px -1px rgba(255,255, 255,1)",
  },
}));

export default useStyles;
