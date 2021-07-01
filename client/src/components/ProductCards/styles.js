import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
        width: 220,
        height: 300,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },
    image: {
        backgroundSize:'contain',
        height: 150,
        paddingLeft:10,
        paddingRight:10 
    },
    name: {
        height: 44,
    },
    cardContent: {
        padding: 8,
    },
    quantityInput: {
        width: 65,
        borderRadius: 5,
        backgroundColor: theme.palette.common.white,
    },
    favButton: {
        position: 'absolute',
        zIndex: 2,
        transform: 'translate(60px, 0px);'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
           alignItems: 'flex-start',
           marginTop: 20,
        },
    },
    star:{
        color: '#FCD34D',
        fontSize: 12
    },
}));

export default useStyles;