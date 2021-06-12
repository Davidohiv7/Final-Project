import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

//Imports Material UI components:
import { Box, CardContent, Tab, Tabs, TextField, InputAdornment, Button, FormControl,InputLabel, Select, MenuItem }from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';
import { getCategories } from '../../../../actions/actions';

function CreateForm({categories, getCategories}) {


    useEffect(() => {
        getCategories()
    }, [])

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);

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
                    className = {classes.input}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
                />

                    <Button onClick= {()=>console.log(categories)} className = {classes.button}>Create</Button>
                </form>
            </CardContent>
            }

            {selectedTab === 1 && 
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <Button className = {classes.button}>Create</Button>
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
    };
    }

  // Connects the Component with the store
    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(CreateForm);
