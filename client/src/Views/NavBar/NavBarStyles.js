import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }, 
    logo: {
        marginRight: theme.spacing(2),
    },
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        marginLeft: theme.spacing(2),
        borderRadius: 5,
    },
    buttonUser: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderRadius: 5,
    },
    title: {
        flexGrow: 1,
        display: "inline-block",
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
    div: {
        position: "absolute;right:0;top:0",
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}));

export default useStyles;