import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  },
  tableContainer: {
    marginBottom: 15,
    maxHeight: 600,
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
  productName: {
    marginLeft: 15,
  },
  head: {
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  homeButton: {
    margin: 16,
  },
}));

export default useStyles;
