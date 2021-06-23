import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '99%',
        borderRadius: theme.shape.borderRadius,
        margin: 8
    },
    container: {
        margin: 40,
        width: 750,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius,
        padding: 8
    },
    emailInput: {
        marginLeft: 8,
        width: '30ch'
    },
    inputBtn: {
        margin: 10
    },
    description: {
        marginTop: 16,
        marginLeft: 10
    }
}));

export default useStyles;