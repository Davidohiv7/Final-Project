import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    imageDis: {
        display: "flex",
        flexDirection: "column",
        position: 'relative',
        justify: 'space-between',
    }
}));

export default useStyles;