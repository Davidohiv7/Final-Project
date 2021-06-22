import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: '3%',
        marginBottom: '3%'
    },

    slideContainer: {
        marginLeft: '5%',
        padding: '0 !important'
    },

    slide: {
        display: 'flex',
        justifyContent: 'center',
        height: 'fit-content',
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
        '&:hover': {
            background: '#4d0f00',
        },
        color: "white",
        borderRadius: 5,
        margin: '4%',
        width: '90%'
    },
    filterGrid: {
        marginLeft: 20,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        marginTop: 11,
        marginBottom: 11,
        boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
    },
    catalogueContainer: {
        marginLeft: theme.spacing(5),
        height: "57%",
    },
    profilePic: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: 10,
    },

    profileContainer: {
        padding: 0
    },



}));

export default useStyles;
