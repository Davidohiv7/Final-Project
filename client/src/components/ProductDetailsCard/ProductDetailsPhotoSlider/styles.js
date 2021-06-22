import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
    },
    image: {
        height: '70%',
        margin: theme.spacing(3),
    },
    images: {
        display: 'flex',
        listStyle: 'none'
    },
    imageSlider: {
        margin: 2,
    },
}));

export default useStyles;