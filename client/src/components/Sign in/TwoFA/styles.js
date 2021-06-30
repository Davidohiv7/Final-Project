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
    verifyButton: {
        marginTop: 40,
        width: 165,
    },
    resendButon: {
        marginTop: 5,
        width: 165,
    },
    backButton: {
        marginTop: 24,
    },
    popover: {
        marginTop: 10,
    },
}));

export default useStyles;