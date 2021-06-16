import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    demo: {
        backgroundColor: theme.palette.common.white,
    },
    title: {
        margin: 4,
        color: theme.palette.primary.main,
    },
    list: {
        maxHeight: 200, 
        overflow: 'auto'
    }
    ,
    button: {
      margin: 16,
    },
    confirmOrderSuccess: {
        color: theme.palette.success.main,
    },
}));

export default useStyles;