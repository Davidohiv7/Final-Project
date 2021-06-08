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
        flexGrow: 1,
    }
}));

export default useStyles;