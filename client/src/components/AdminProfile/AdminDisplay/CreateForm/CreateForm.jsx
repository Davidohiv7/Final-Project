import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

//Imports Material UI components:
import { Box, CardContent, Tab, Tabs, TextField, InputAdornment, Button, Paper, Typography }from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';
import { getCategories, createCategory } from '../../../../actions/actions';

function CreateForm({categories, getCategories, createCategory}) {
    
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        getCategories()
    },[])

    const classes = useStyles();


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box className={classes.root}>

            <Tabs className= {classes.tabs} value={selectedTab} onChange={handleChange} >
                <Tab label="Create Product"  />
                <Tab label="Create Category"  />
            </Tabs>
            {selectedTab === 0 && 
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <TextField className= {classes.input} id="outlined-number" label="Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>

                    <TextField className= {classes.input} id="outlined-number" label="Stock" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>
                    <TextField className= {classes.input} id="outlined-basic" label="Description" variant="outlined" multiline />

                <Autocomplete
                    id= 'categorySelector'
                    className = {classes.input}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
                    onChange={(e,v) => {
                        if(!selectedCategories.includes(v.name)) {
                            if(selectedCategories.length >= 10) alert('You can set up to 10 categories to a single product.')
                            else setSelectedCategories([...selectedCategories, v.name])
                        }
                    }}
                />
                <Paper elevation={5} className = {classes.selectedCategories}>
                    {selectedCategories.map((category)=> (
                        <Paper key= {category} className= {classes.selectedCategory}>
                            <Typography>{category}</Typography>
                            <Button onClick= {() =>setSelectedCategories(selectedCategories.filter(c => c !== category))} value={category}  className= {classes.removeCategory}>X</Button>
                        </Paper>
                    ))}
                </Paper>

                    <Button className = {classes.button}>Create</Button>
                </form>
            </CardContent>
            }

            {selectedTab === 1 && 
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField className= {classes.input} id="nameOfCategory" label="Name" variant="outlined" />
                    <Button 
                    onClick= {async() => {
                        await getCategories()
                        for(let category of categories) {
                            if(category.name === document.getElementById('nameOfCategory').value) {
                                return alert(`${document.getElementById('nameOfCategory').value} category already exists.`)
                            }
                        }
                        createCategory(document.getElementById('nameOfCategory').value)
                        alert(`${document.getElementById('nameOfCategory').value} category has been created`)
                        }
                    } 
                    className = {classes.button}>Create
                    </Button>
                </form>
            </CardContent>
            }
    
        </Box>
    )
}

// MapStateToProps for access to specific items of the store-state
function mapStateToProps(state) {
    return {
        categories: state.categories
    };
    }

  // MapDispatchToProps to directly dispatch an action when called in this component
    function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        createCategory: (name) => dispatch(createCategory(name))
    };
    }

  // Connects the Component with the store
    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(CreateForm);
