import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        marginBottom: 15,
        maxHeight: 200,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    tableContainerResponsive: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        color: theme.palette.secondary.main,
        fontWeight: "bold",
    },
    addressTableHead: {
        backgroundColor: theme.palette.primary.main,
        position: "sticky",
        top: 0,
        zIndex: 5,
    },
}));

export default useStyles;