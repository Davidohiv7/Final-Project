import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    filter: {
        backgroundColor: theme.palette.primary.main,
        paddingBottom: theme.spacing(40),
        paddingTop: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
          display: "none"
       },
    },
    links: {
        color: theme.palette.secondary.main,
    },
    filter_responsive:{
        [theme.breakpoints.up('sm')]: {
          display: "none"
       },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    }
));

export default useStyles;