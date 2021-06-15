
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 650,
    marginTop: 10,
  },

  editButton: {
    background: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
    marginLeft: 10
  },

  

}));

export default useStyles;