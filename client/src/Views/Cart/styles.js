import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            marginLeft: 5,
            marginBottom: 40,
        },
    },
    head: {
        backgroundColor: theme.palette.primary.main,
        padding: 6,
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
            display: 'none',
        },
    },
    productName: {
        marginLeft: 15,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
    image: {
        boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
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