import {
    makeStyles, fade
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    catalogueMainContainer: {
        backgroundColor: "white",
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.6)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: '15px',
        borderRadius: '5px',
    },
    searchSortContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '98%',
        borderRadius: '10px',
        padding: '5px',
        marginBottom: '24px',
    },
    search: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#E5E7EB",
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
        },
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    productCard: {
        margin: '10px',
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '15px',
        width: '100%'
    },
    autoCompleteList: {
        position: 'absolute',
        zIndex: 20,
        backgroundColor: theme.palette.common.white,
        width: '100%',
        borderBottomRightRadius: '2px',
        borderBottomLeftRadius: '2px',
        maxHeight: 200,
        overflow: 'auto',
        boxShadow: '1px 3px 6px -2px rgba(0,0,0,0.77)',
    }
}));

export default useStyles;