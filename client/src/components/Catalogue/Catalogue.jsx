import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, updateSearching } from '../../actions/actions';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ProductCards from '../ProductCards/ProductCards.jsx'
import PaginationBar from './PaginationBar/PaginationBar.jsx'
import SortSelect from './SortSelect/SortSelect.jsx'

//Params catalogue function products, getAllProducts,
// Catalogue
export default function Catalogue() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products, filter, order } = useSelector((state) => ({ ...state }))

    const handleSearchChange = event => {
      dispatch(getProducts({name: event.target.value, category: null, filter, order}))
      dispatch(updateSearching(event.target.value))
    };


    return (
        <Paper className={classes.catalogueMainContainer}>
            <div className={classes.searchSortContainer}> 
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                    />

                </div>
                <SortSelect/>
            </div>
            <Grid container spacing={1} className={classes.gridContainer}>
                {products && products.map(product => {
                    return (
                      <Grid key={product.id} item> 
                        <ProductCards className={classes.productCard} product={product}/>
                      </Grid>
                    )
                } )}
            </Grid>
            <div className={classes.paginationContainer}>
              <PaginationBar/>
            </div>
        </Paper>
    )
};

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  catalogueMainContainer: {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '1px 1px 15px -1px rgba(0,0,0,0.6)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      padding: '15px',
      borderRadius: '10px',
  },
  searchSortContainer: {
    display: 'flex',  
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
    borderRadius: '10px',
    padding: '5px',
    marginBottom: '24px',
  },
  search: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
    },
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  productCard: {
    margin: '10px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px',
    width: '100%'
  }
}));
