import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    demo: {
        backgroundColor: theme.palette.common.white,
    },
    title: {
        margin: 4,
        color: theme.palette.primary.main,
    },
    button: {
      margin: 16,
    },
}));

export default useStyles;