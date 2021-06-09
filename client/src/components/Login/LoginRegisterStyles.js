import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
            flexGrow: 1,
        },
    paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        marginRight: theme.spacing(2),
        borderRadius: 5,
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
    container: {
        backgroundColor: theme.palette.secondary.main,
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'fit-content',
        padding: '10px',
    },
    sortForm: {
        margin: theme.spacing(1),
        width: '200px'
    },
}));

export default useStyles;