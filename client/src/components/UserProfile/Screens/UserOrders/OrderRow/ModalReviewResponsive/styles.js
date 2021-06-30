import {
    makeStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        background: theme.palette.primary.dark,
        variant: "contained",
        color: "white",
        borderRadius: 5,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default useStyles;