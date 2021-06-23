import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 650,
        height: 400,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },
    address: {
        width: 350,
    },
    zip: {
      width: 120,
    },
}));

export default useStyles;