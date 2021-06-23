
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '50vh'
  },  

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
  
  pagination: {
    marginTop: 15
  },
  
  header: {
    fontWeight: '600'
  }

}));

export default useStyles;