import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 650,
        height: 400,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },
    input: {
        marginTop: 16,
        width: 200,
    },
}));

export default useStyles;