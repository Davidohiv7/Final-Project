import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    address: {
        width: 350,
      },
    zip: {
      width: 120,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
}));

export default useStyles;