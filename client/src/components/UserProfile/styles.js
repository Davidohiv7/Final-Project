import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "3%",
    marginBottom: "3%",
    height: theme.spacing(100),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      height: theme.spacing(90),
    },
  },
  slide: {
    padding: theme.spacing(50),
    marginLeft: "5%",
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    background: theme.palette.primary.dark,
    width: 200,
    variant: "contained",
    color: "white",
    borderRadius: 5,
    margin: theme.spacing(1),
  },
  filterGrid: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    boxShadow: "1px 1px 8px -1px rgba(0,0,0,0.6)",
    maxWidth: "70%",
    [theme.breakpoints.down('xs')]: {
      display: "none"
    },
  },
  catalogueContainer: {
    marginLeft: theme.spacing(5),
    height: "57%",
  },
  profilePic: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 10,
    color: "white",
  },
  BoxLogOut: {
    marginTop: 100,
  },
  quantityInput: {
    width: 75,
    borderRadius: 5,
    backgroundColor: theme.palette.common.white,
  },
  profile: {
    border: 'solid',
    borderRadius: theme.spacing(5),
    borderColor: theme.palette.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter_responsive: {
    height: "1%",
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },
  },
  responsive_container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  box_responsive: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    marginTop: 10,
  },
}));

export default useStyles;
