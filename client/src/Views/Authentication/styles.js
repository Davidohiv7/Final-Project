import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.shape.borderRadius,
    },
    container: {
        width: 750,
        height: 500,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
      },

    height100: {
        height: '100%',
    },
}));

export default useStyles;