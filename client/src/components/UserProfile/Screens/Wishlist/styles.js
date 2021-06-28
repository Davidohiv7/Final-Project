import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  generalContainer: {
    maxHeight: '100%',
    overflow: 'auto'
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

  header: {
    fontWeight: '600'
  }
  

}));

export default useStyles;