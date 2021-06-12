
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

tabs: {
    marginLeft: '27%'
},
button: {
    background: theme.palette.primary.dark,
    color: "white",
    borderRadius: 5,
    margin: '4%',
    width: '30%'
},

form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
},

input: {
    margin: '2%',
    width: '90%'
}

}));

export default useStyles;