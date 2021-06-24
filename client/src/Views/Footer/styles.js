import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    logo: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        boxShadow: "1px 3px 2px -1px rgba(255,255, 255,1)",
    },
}));

export default useStyles;