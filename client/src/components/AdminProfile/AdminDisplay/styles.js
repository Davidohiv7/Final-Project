
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

display: {
  margin: 20,
  alignContent: 'center',
  width: '100%'
},
container: {
  margin: 0,
  display: 'flex',
  flexDirection:'column',
  alignItems: 'center',
  padding: 20,
  width: '100%'
},

add: {
  color: 'white',
  minWidth: '20%',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  fontWeight: '600'
},

upBar: {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-evenly'
},

searchBar: {
  width: '70%'
},

filter: {
  width: '20%'
}


}));

export default useStyles;