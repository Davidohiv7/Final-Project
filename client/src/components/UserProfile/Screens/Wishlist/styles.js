import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  generalContainer: {
    maxHeight: '100%',
    overflow: 'auto'
  },
  table: {
    marginTop: 10,
  },
  header: {
    fontWeight: '600'
  },

}));

export default useStyles;