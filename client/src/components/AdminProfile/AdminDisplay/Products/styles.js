
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 650,
    marginTop: 10,
  },

  editButton: {
    minWidth: 30,
    borderRadius: 55,
    color: 'white',
    '&:hover': {
      backgroundColor: 'lightGray',
    },
  },

  

}));

export default useStyles;