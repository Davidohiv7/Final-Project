import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { Box, CardContent, Tab, Tabs, TextField, InputAdornment, Button, Paper, Typography, useRadioGroup }from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';

import { getCategories, createCategory } from '../../../../actions/admin/admin_actions';


export default function CreateForm() {

    // const [selectedCategories, setSelectedCategories] = useState([]);

    // const categories = useSelector((state) => state.adminReducer.categories)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getCategories())
    // },[])

    const classes = useStyles();


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box className={classes.root}>

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



    
    </Box>
    )
}
            {/* CREATE CATEGORY */}
            {/* // <CardContent className={classes.tabContainer}>
            //     <form className= {classes.form}>
            //         <TextField className= {classes.input} id="nameOfCategory" label="Name" variant="outlined" />
            //         <Button 
            //         onClick= {async() => {
            //             await getCategories()
            //             for(let category of categories) {
            //                 if(category.name === document.getElementById('nameOfCategory').value) {
            //                     return alert(`${document.getElementById('nameOfCategory').value} category already exists.`)
            //                 }
            //             }
            //             dispatch(createCategory(document.getElementById('nameOfCategory').value))
            //             alert(`${document.getElementById('nameOfCategory').value} category has been created`)
            //             }
            //         } 
            //         className = {classes.button}>Create
            //         </Button>
            //     </form>
            // </CardContent> */}