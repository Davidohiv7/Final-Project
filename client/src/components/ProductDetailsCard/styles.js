import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 750,
        height: 500,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    container: {
        display:"flex",
        height: '100%',
    },
    section: {
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
          width:310,
          height:200,
        },
    },
    scoreContainer: {
        width: 120,
        marginBottom: 6,
        marginLeft: 65
    },
    card: {
        height: '100%',
        [theme.breakpoints.down('xs')]: {
          width:310,
          height:350,
        },
    },
    name: {
        marginRight: 17,
    },
    quantityInput: {
        width: 80,
        borderRadius: 5,
        backgroundColor: theme.palette.common.white,
    },
    closeButton: {
        margin: 0,
        padding: 0,
    },
    cartTotal: {
        marginLeft: 25,
                [theme.breakpoints.down('xs')]: {
          height:11,
        },
    },
    total: {
        marginBottom: 8,
    },
    favButton: {
        width: 155,
        marginBottom: 8,
        [theme.breakpoints.down('xs')]: {
          width: 50,
          height:50,
        },
    },
    favButtonNot: {
        visibility: 'hidden',
        width: 155,
        [theme.breakpoints.down('xs')]: {
          width: 50,
          height:50,
        },
    },
    responsive_modal:{
        height: 700,
        [theme.breakpoints.up('sm')]: {
           display: 'none'
        },
    },
    responsive_content:{
          width:300,
          height:220,
    },
    cardcontent:{
        heigth: '100%',
    },
    bttn_container:{
        paddingTop:2,
    },

    }
));

export default useStyles;