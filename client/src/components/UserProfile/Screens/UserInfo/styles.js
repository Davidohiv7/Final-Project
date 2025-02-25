import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  },
  profilePic: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 10,
    boxShadow: "1px 9px 18px -1px rgba(0,0,0,1)",
  },
  name: {
    margin: 20,
  },
  title: {
    margin: 5,
    fontWeight: 'bold'
  },
  titleContent: {
    margin: 5,
  },
  addAddresButton: {
    margin: 15,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
