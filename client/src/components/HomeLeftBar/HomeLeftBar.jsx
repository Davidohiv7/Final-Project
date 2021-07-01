import { useDispatch, useSelector } from "react-redux";
import React, { useState} from 'react';

import { Box, Button, Grid}from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Home } from '@material-ui/icons'

import useStyles from './styles'

import { getProductsByCategory, getAllProducts, updateCategory, updateSearching } from '../../actions/home/home_actions'

export default function HomeLeftBar({ setAutocomplete }) {

    const { searched, order, filter, categories } = useSelector((state) => ({ ...state.homeReducer }))

    const [open, setOpen] = useState(false);

    const classes = useStyles();  
    const dispatch = useDispatch();

    function handleGetAllClick() {
        dispatch(getAllProducts())
        dispatch(updateCategory(''))
        dispatch(updateSearching(''))
        setAutocomplete(false)
    }

    function handleClick(category) {
        dispatch(getProductsByCategory({name: searched, category, order, filter}))
        dispatch(updateCategory(category))
        setAutocomplete(false)
    }


    //RESPONSIVE SECTOR -------

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //--------------

    return (
        <Grid container>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' className={classes.filter} elevation={3}>
            <Button
                color="secondary"
                className={classes.button}
                startIcon={<Home/>}
                onClick={() => handleGetAllClick()}
            >
                get all
            </Button>
            {/* <Link href="/" className={classes.links}><HomeIcon /></Link> */}
            {categories ? 
            categories.map(category => 
            <Button size='small' color="secondary" onClick={() => handleClick(category)}>{category}</Button>) :
            <p>No Such Category</p>}
        </Box>

        <Grid className={classes.filter_responsive}>
            <Button className={classes.category_bttn} onClick={handleClickOpen}>
            Select Categories
            <ArrowDropDownIcon/>
            </Button>
            <Divider className={classes.divider}/>
            <Dialog  disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle >Select one category to search</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="demo-dialog-native">Categories</InputLabel>
              <Select
                native
                input={<Input id="demo-dialog-native" />}
              >
                <option onClick={() => handleGetAllClick()}>All</option>
                {categories ? 
                categories.map(category => 
                <option value={category} onClick={() => handleClick(category)}>{category}</option>) :
                <option aria-label="None" value="">No Such Category</option>}
              </Select>
            </FormControl>
            </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        </Grid>
    );
}

