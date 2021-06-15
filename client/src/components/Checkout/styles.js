import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        height: 600,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
      },
    container: {
          height: '100%',
    },
    components: {
        width: '100%',
        height: 500,
    },
    divider: {
        width: '100%',
    },
    stepper: {
        width: '100%',
        height: 150,
    },
}));

export default useStyles;