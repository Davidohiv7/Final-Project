import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    color:{
        backgroundColor: 'white',
        height: '100%'
    },
    divider:{
        backgroundColor: theme.palette.primary.main,
        display:'flex',
        width: '100%'
    },
    filter: {
        backgroundColor: 'white',
        paddingBottom: theme.spacing(40),
        paddingTop: theme.spacing(3),
        paddingLeft: 30,
        [theme.breakpoints.down('xs')]: {
          display: "none",
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
    category_bttn:{
        display: 'flex',
        textAlign: 'center',
        width: '100%',
        backgroundColor: theme.palette.secondary.main
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
       
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}
));

export default useStyles;