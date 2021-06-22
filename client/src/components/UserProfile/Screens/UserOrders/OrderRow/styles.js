import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  collapseTableCell: { 
    paddingBottom: 0, 
    paddingTop: 0 
  },
  keyIconCell: {
    width: 5,
    padding: 0,
    paddingLeft: 16
  }
}));

export default useStyles;
