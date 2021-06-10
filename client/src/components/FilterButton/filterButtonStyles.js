import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        borderRadius: 5,
    },
}));

export default useStyles;