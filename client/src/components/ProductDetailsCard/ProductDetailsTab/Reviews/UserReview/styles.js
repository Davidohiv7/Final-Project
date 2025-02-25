import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  inline: {
    display: 'inline',
  },
  divider: {
    width: '100%',
  },
}));

export default useStyles;