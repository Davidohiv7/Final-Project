import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      width: '101.7%',
      flexGrow: 1,
      height: 150,
      borderRadius: '2px',
      overflow: 'hidden',
    },
    img: {
      height: 150,
      display: 'block',
      width: '100%',
      overflow: 'hidden',
    },
    stepper: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: 20,
        position: 'relative',
        top: '-35px',
    }
  }));

