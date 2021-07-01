import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paymentBox: {
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  logo: {
      width: 150,
  },
  truePayment: {
    color: theme.palette.success.main,
  },
}));

export default useStyles;