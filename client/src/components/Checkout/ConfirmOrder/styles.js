import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
      },
    demo: {
        backgroundColor: theme.palette.secondary.main,
      },
    title: {
        margin: theme.spacing(4, 0, 2),
        color: theme.palette.primary.main,
      },
}));

export default useStyles;