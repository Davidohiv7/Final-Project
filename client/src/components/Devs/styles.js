import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '96%',
        padding: theme.spacing(3),
        alignItems: 'center',
    },
    devsCard: {
        '&:hover': {
            background: theme.palette.secondary.main,
            opacity: '90%'
        },
    },
    gridContainer: {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: '1px 1px 15px -1px rgba(0,0,0,0.6)',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '10px',
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
            margin: 0,
        },
    },
}));

export default useStyles;