import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    }, 
    logo: {
        marginRight: theme.spacing(2),
    },
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        borderRadius: 5,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            marginLeft: theme.spacing(1),
        },
    },
    buttonUser: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderRadius: 5,
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
        },
    },
    title: {
        flexGrow: 1,
        display: "inline-block",
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
    div: {
        position: "absolute;right:0;top:0",
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1),
        },
    },
}));

export default useStyles;