import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    devsCard: {
        margin: '10px',
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
}));

export default useStyles;