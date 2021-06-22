import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
// Material UI imports
import { CardContent, Button, Box, Paper, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';

import Orders from './Orders/Orders'
import CreateCategory from './CreateCategory/CreateCategory';
import Categories from '../AdminDisplay/Categories/Categories'
import CreateProduct from './CreateProduct/CreateProduct';
import Products from './Products/Products'
import ProductsPaginationBar from '../../Catalogue/PaginationBar/PaginationBar';
import OrdersPaginationBar from './Orders/PaginationBar/PaginationBar'
import CategoriesPaginationBar from './Categories/PaginationBar/PaginationBar'
import { getProducts } from '../../../actions/home/home_actions';
import { getOrders, getCategories } from '../../../actions/admin/admin_actions';
import OrderDetail from './OrderDetail/orderDetail';


export default function AdminDisplay({displayStatus, setDisplayStatus}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searched, products, filter, order } = useSelector((state) => ({ ...state.homeReducer }))
  const [editProduct, setEditProduct] = useState({})
  const [editOrder, setEditOrder] = useState({})

  const handleProductSearch = event => {
    dispatch(getProducts({name: event.target.value, filter, order}))
  };

  const handleCategoriesSearch = event => {
    dispatch(getCategories({name: event.target.value}))
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
        <ProductsPaginationBar/>
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
          <TextField onChange={handleCategoriesSearch} className={classes.searchBar} label="Search" variant="outlined" />
          <Button className={classes.add} onClick={()=>setDisplayStatus('create_category')}>ADD CATEGORY</Button>
        </CardContent>
        <Paper elevation= '8' className= {classes.display}>
          <Categories setDisplayStatus={setDisplayStatus}/>
        </Paper>
        <CategoriesPaginationBar/>
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

  if(displayStatus === 'orders') {
    return (
      <Box className={classes.container}>
      <CardContent className= {classes.upBar}>
      <Autocomplete
        className = {classes.filter}
        id= 'statusSelector'
        options={['All','Created', 'Paid', 'In progress', 'Cancelled', 'Completed']}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
        onChange={(e, v) => {
          if (v === 'All') dispatch(getOrders())
          else if(v){
                dispatch(getOrders({status: v}))
            }
        }}
      />
      </CardContent>
      <Paper elevation= '8' className= {classes.display}>
        <Orders setEditOrder={setEditOrder} setDisplayStatus={setDisplayStatus}/>
      </Paper>
      <OrdersPaginationBar/>
    </Box>
    )
  }

  if(displayStatus === 'orderDetail') {
    return (
        <CardContent className= {classes.display}>
          <OrderDetail editOrder={editOrder} setDisplayStatus={setDisplayStatus}/>
        </CardContent>
    )
  }

}
