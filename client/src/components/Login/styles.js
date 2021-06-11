import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 5,
    },
    logo:{
        maxHeight:60,
        background: theme.palette.primary.main,
        filter: theme.palette.secondary.dark,
        borderRadius: 5,
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
        margin: theme.spacing(2),
        marginLeft: theme.spacing(25),
        minHeight: '100',
        backgroundColor: theme.palette.secondary.main,
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        maxWidth: 'md',
        borderRadius: 5,
    },
    button: {
        background: theme.palette.primary.dark,
        color: "white",
        borderRadius: 5,
        marginTop: theme.spacing(2),
    },
    box: {
        display:"flex",
        justifyContent:"center",
        margin: theme.spacing(1),
    },
}));

export default useStyles;