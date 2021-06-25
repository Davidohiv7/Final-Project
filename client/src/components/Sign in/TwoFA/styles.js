import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    inputsContainer: {
        height: '100%',
    },
    input: {
        width: 37,
        marginLeft: 5,
    },
    button: {
        marginTop: 40,
        width: 120,
    },
}));

export default useStyles;