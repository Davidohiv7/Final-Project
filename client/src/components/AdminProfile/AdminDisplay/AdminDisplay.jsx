import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
// Material UI imports
import { CardContent, Button, Box, Paper, TextField} from '@material-ui/core';
import useStyles from './styles';

import CreateCategory from './CreateCategory/CreateCategory';
import Categories from '../AdminDisplay/Categories/Categories'
import CreateProduct from './CreateProduct/CreateProduct';
import Products from './Products/Products'
import PaginationBar from '../../Catalogue/PaginationBar/PaginationBar';
import { getProducts } from '../../../actions/home/home_actions';


export default function AdminDisplay({displayStatus, setDisplayStatus}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searched, products, filter, order } = useSelector((state) => ({ ...state.homeReducer }))
  const [editProduct, setEditProduct] = useState({})

  const handleProductSearch = event => {
    dispatch(getProducts({name: event.target.value, filter, order}))
  };

  if(displayStatus === 'products') {
    return (
      <Box className={classes.container}>
        <CardContent className= {classes.upBar}>
        <TextField onChange={handleProductSearch} className={classes.searchBar} label="Search" variant="outlined" />
        <Button className={classes.add} onClick={()=>setDisplayStatus('create_product')}>ADD PRODUCT</Button>
        </CardContent>
        <Paper elevation= '8' className= {classes.display}>
          <Products setEditProduct= {setEditProduct} setDisplayStatus={setDisplayStatus}/>
        </Paper>
        <PaginationBar/>
      </Box>
    )
  }
  
  if(displayStatus === 'create_product') {
    return (
        <CardContent className= {classes.display}>
          <CreateProduct setDisplayStatus={setDisplayStatus}/>
        </CardContent>
    )
  }

  if(displayStatus === 'edit_product') {
    return (
        <CardContent className= {classes.display}>
          <CreateProduct editProduct={editProduct} setDisplayStatus={setDisplayStatus}/>
        </CardContent>
    )
  }

  if(displayStatus === 'categories') {
    return (
      <Box className={classes.container}>
      <CardContent className= {classes.upBar}>
      <TextField className={classes.searchBar} label="Search" variant="outlined" />
      <Button className={classes.add} onClick={()=>setDisplayStatus('create_category')}>ADD CATEGORY</Button>
      </CardContent>
      <Paper elevation= '8' className= {classes.display}>
        <Categories setDisplayStatus={setDisplayStatus}/>
      </Paper>
      <PaginationBar/>
    </Box>
    )
  }
  
  if(displayStatus === 'create_category') {
    return (
        <CardContent className= {classes.display}>
          <CreateCategory setDisplayStatus={setDisplayStatus}/>
        </CardContent>
    )
  }

}
