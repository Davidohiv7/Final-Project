
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: 5,
    margin: '4%',
    width: '40%',
    '&:hover': {
        background: theme.palette.primary.dark
    }
  },

  cancel: {
    borderRadius: 5,
    margin: '4%',
    width: '40%',
    background: theme.palette.secondary.main,
  },

  input: {
    width: '40%'
  },

  buttonContainer: {
    width: '50%'
  }
  

}));

export default useStyles;