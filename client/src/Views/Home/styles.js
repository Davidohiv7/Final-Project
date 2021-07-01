import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid_container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    carousel:{
        padding: '0px !important',
        [theme.breakpoints.down('xs')]: {
          display: "none"
        },
    },
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        borderRadius: 5,
    },
    filterGrid: {
        backgroundColor: "white",
        borderRadius: theme.shape.borderRadius,
        marginTop: 11,
        marginBottom: 11,
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.6)',

        [theme.breakpoints.down('xs')]: {
          marginTop: 3,
          marginBottom: 3,
          backgroundColor: theme.palette.secondary.main,
        },
    },
    catalogueContainer: {
        height: "57%",
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.6)'
    },
    paperConfig: {
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.6)',
        backgroundColor: "white"
    }
}));

export default useStyles;
