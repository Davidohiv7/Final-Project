import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.shape.borderRadius,
    },
    head: {
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: theme.palette.secondary.main,
    },
    tableContainer: {
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    tableContainerResponsive: {
        marginBottom: 3,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    productName: {
        marginLeft: 15,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
    divider: {
        color: theme.palette.secondary.dark,
    },
    quantityInput: {
        width: 75,
        borderRadius: 5,
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('sm')]: {
            width: 50,
        },
    },
    subtotal: {
        margin: 25,
    },
    checkout: {
        margin: 5,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default useStyles;