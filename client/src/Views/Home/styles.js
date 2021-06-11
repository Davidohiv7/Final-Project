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
    
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        borderRadius: 5,
    },
    filterGrid: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        marginTop: 11,
        marginBottom: 11,
        boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
    },
    catalogueContainer: {
        marginLeft: theme.spacing(5),
        height: "57%",
    }
}));

export default useStyles;
