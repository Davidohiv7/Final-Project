import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    width: 400,
    height: 400,
  },
  title: {
    marginTop: 30,
    marginBottom: 20,
  },
  name: {
    marginRight: 18,
  },
  image: {
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    width: '90%',
    margin: 20
  },
}));

export default useStyles;
