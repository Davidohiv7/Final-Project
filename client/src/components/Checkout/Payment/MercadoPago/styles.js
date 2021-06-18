import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
      },
    button: {
      padding: '15px',
      marginTop: 20,
      backgroundColor: theme.palette.common.white
    },
    truePayment: {
      color: theme.palette.success.main,
      marginBottom: 20
    },
}));

export default useStyles;