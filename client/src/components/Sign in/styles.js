import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    inputsContainer: {
        height: '100%',
    },
    input: {
        marginTop: 25,
        width: 250,
    },
    button: {
        marginTop: 25,
        width: 120,
    },
}));

export default useStyles;