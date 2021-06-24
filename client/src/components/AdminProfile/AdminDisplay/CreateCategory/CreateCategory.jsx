import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { Box, TextField, Button,}from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles';

import { createCategory, getCategories } from '../../../../actions/admin/admin_actions';


export default function CreateCategory({ setDisplayStatus }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector((state)=> state.adminReducer.categories)

    const [openError, setOpenError] = useState(false);
    const [openCreated, setOpenCreated] = useState(false);


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    useEffect(()=> {
        dispatch(getCategories({limit:9999999}))
    }, [])

    return (
        <Box className={classes.container}>
            <TextField  className= {classes.input} id="nameOfCategory" variant="outlined" placeholder= 'Category Name' />
            <Box className={classes.buttonContainer}>
                <Button 
                    onClick= {() => {
                        for (let category of categories) {
                            if(category.name === document.getElementById('nameOfCategory').value){
                                return setOpenError(true)
                            }
                        }
                        dispatch(createCategory(document.getElementById('nameOfCategory').value))
                        setOpenCreated(true)
                    }} 
                className = {classes.button}>Create
                </Button>
                <Button onClick={()=> setDisplayStatus('categories')} className = {classes.cancel}>Cancel</Button>
            </Box>


            <Snackbar open={openError} autoHideDuration={4000} onClose={()=> setOpenError(false)}>
                <Alert onClose={()=> setOpenError(false)} severity="error">
                That category has already been created!
                </Alert>
            </Snackbar>
            <Snackbar open={openCreated} autoHideDuration={4000} onClose={()=> setOpenCreated(false)}>
                <Alert onClose={()=> setOpenCreated(false)} severity="success">
                The category has been successfully created!
                </Alert>
            </Snackbar>
        </Box>
    )
}