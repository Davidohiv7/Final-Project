import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: 15,
  },
  title: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
   },
  },
  orderNumber: {

  },
  productName: {
    marginLeft: 15,
  },
  head: {
    backgroundColor: theme.palette.primary.main,
  },
  homeButton: {
    margin: 16,
  },
}));

export default useStyles;
