
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

cancel: {
    borderRadius: 5,
    margin: '4%',
    width: '30%',
    background: theme.palette.secondary.main,
},

buttonContainer: {
    width: '50%',
    position: 'relative',
    right: -235,
    top: -20
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
    '&:hover': {
        border: 'none',
    },
},

selectedCategories: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%'
},

dropzone: {
    height: "8rem",
    width: '85%',
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
},

errorText: {
    margin: 0,
    color: 'red',
    fontSize: 15
},

dragTypo: {
    fontSize: 25
},

delete: {
    marginTop: 10,
    color: 'white',
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
        backgroundColor: 'gray'
    },
}


}));

export default useStyles;