import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  generalContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    padding: 16,
    boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
    [theme.breakpoints.down('sm')]: {
      marginTop: 64,
    },
  },
  table: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },
  tableContainer: {
    maxHeight: 600,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },
  header: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: "bold",
  },
  head: {
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    zIndex: 5,
    [theme.breakpoints.down('sm')]: {
      zIndex: 3,
    },
  },

}));

export default useStyles;