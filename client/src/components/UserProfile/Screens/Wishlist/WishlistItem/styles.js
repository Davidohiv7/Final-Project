import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openDetails: {
    cursor: 'pointer',
  },
  image: {
    boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
  }

}));

export default useStyles;