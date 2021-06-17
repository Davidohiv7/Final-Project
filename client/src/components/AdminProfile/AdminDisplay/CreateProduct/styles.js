
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

tabs: {
    marginLeft: '27%'
},
button: {
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: 5,
    margin: '4%',
    width: '30%',
    '&:hover': {
        background: theme.palette.primary.dark
    }
},

selectedCategory: {
    display: 'flex',
    padding: 8,
    backgroundColor: 'salmon',
    margin: 10
},

removeCategory: {
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: 5,
    minWidth: 10,
    padding: 10,
    height: 4,
    width: 4,
    '&:hover': {
        background: theme.palette.primary.dark
    },
    marginLeft: 6
},

form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
},

input: {
    margin: '2%',
    width: '90%',
},

selectedCategories: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%'
},

dropzone: {
    height: "8rem",
    margin: "1rem",
    padding: "1rem",
    border: "2px dashed salmon",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
},
  
active: {
    border: "2px solid rebeccapurple",
},

errors: {
    color: 'red'
},

images: {
    display: 'flex',
    listStyle: 'none'
},

image: {
    margin:10
}


}));

export default useStyles;