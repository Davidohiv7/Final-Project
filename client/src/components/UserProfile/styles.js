import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "3%",
    marginBottom: "3%",
  },

  slide: {
    padding: theme.spacing(50),
    marginLeft: "5%",
    backgroundColor: theme.palette.secondary.main,
  },

  grid_container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 5,
    color: theme.palette.secondary.main,
    textAlign: "center",
  },

  button: {
    background: theme.palette.primary.dark,
    variant: "contained",
    color: "white",
    borderRadius: 5,
    margin: theme.spacing(1),
  },
  filterGrid: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    marginTop: 11,
    marginBottom: 11,
    boxShadow: "1px 1px 8px -1px rgba(0,0,0,0.6)",
  },
  catalogueContainer: {
    marginLeft: theme.spacing(5),
    height: "57%",
  },
  profilePic: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 10,
  },
  BoxLogOut: {
    position: "absolute",
    marginTop: "28%",
    marginLeft: 28,
  },
  tableContainer: {
    marginBottom: 15,
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  productName: {
    marginLeft: 15,
  },
  quantityInput: {
    width: 75,
    borderRadius: 5,
    backgroundColor: theme.palette.common.white,
  },
  head: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
