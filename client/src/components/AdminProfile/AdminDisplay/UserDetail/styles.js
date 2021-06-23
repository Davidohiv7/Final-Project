
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 650,
    marginTop: 10,
  },

  buttonContainer: {
    width: '50%',
    position: 'relative',
    right: -235,
    top: -20
  },

  button: {
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: 5,
    margin: '4%',
    width: '30%',
    '&:hover': {
        background: theme.palette.primary.dark
    }
  },

  cancel: {
    borderRadius: 5,
    margin: '4%',
    width: '30%',
    background: theme.palette.secondary.main,
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