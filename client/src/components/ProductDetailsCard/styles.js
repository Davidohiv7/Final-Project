import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 750,
        height: 500,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius,
    },
    container: {
        height: '100%',
    },
    section: {
        height: '100%',
        width: '100%'
    },
    scoreContainer: {
        width: 120,
        marginBottom: 6,
        marginLeft: 65
    },
    card: {
        height: '100%',
    },
    name: {
        marginRight: 17,
    },
    quantityInput: {
        width: 80,
        borderRadius: 5,
        backgroundColor: theme.palette.common.white,
    },
    closeButton: {
        margin: 0,
        padding: 0,
    },
    cartTotal: {
        marginLeft: 25,
    },
    favButton: {
        width: 155,
    },
}));

export default useStyles;