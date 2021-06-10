import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    slide: {
        padding: theme.spacing(8),
    },
    grid_container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderRadius: 5,
        color: theme.palette.secondary.main,
        textAlign: 'center',
    },
    filter: {
        backgroundColor: theme.palette.primary.main,
        paddingBottom: theme.spacing(40),
        paddingTop: theme.spacing(3),
        height: "57%",
    },
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        borderRadius: 5,
    },
    links: {
        color: theme.palette.secondary.main,
    },
    catalogueContainer: {
        marginLeft: theme.spacing(5),
        height: "57%",
    }
}));

export default useStyles;
