import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { Box, CardContent, Tab, Tabs, TextField, InputAdornment, Button, Paper, Typography, useRadioGroup }from '@material-ui/core'
import useStyles from './styles';

import { getCategories, createCategory } from '../../../../actions/admin/admin_actions';


export default function CreateCategory() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const categories = useSelector((state)=> state.adminReducer.categories)

    return (
        <Box className={classes.root}>
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
                    dispatch(createCategory(document.getElementById('nameOfCategory').value))
                        alert(`${document.getElementById('nameOfCategory').value} category has been created`)
                    }
                    } 
                    className = {classes.button}>Create
                    </Button>
                </form>
            </CardContent>

        </Box>
    )
}
            {/* CREATE CATEGORY */}