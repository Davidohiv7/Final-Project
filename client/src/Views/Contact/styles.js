import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(2),
    },
    inputsContainer: {
        height: '100%',
    },
    input: {
        marginTop: 10,
        width: 250,
    },
    button: {
        marginTop: 20,
        width: 120,
    },
}));

export default useStyles;