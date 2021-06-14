import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        position: 'absolute',
        top: 0,
        zIndex: 5,
        width: '100%',
        height: '100%'
    },
    title: {
        color: theme.palette.success.main,
    },
}));

export default useStyles;