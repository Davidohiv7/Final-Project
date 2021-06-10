import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, MenuItem, InputLabel, InputBase, FormControl, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from "react-redux";
import { getAllProducts, changeSort } from '../../actions/actions'
import ProductCards from '../ProductCards/ProductCards.jsx'


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
    sortForm: {
      margin: theme.spacing(1),
      marginTop: '0px',
      width: '200px'
    },
    select: {
      fontSize: '12px',
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

// Sort Select
function SortSelect({ handleChange, value }) {
    const classes = useStyles();

    return (
        <FormControl variant='outlined' fullWidth className={classes.sortForm}>
            <InputLabel className={classes.select} id='sortLabel'>Ordenar por...</InputLabel>
            <Select
                labelId='sortLabel'
                className={classes.select}
                value={value}
                onChange={handleChange}
                label='Ordenar por...'
            >
                <MenuItem value={''}>-</MenuItem>
                <MenuItem value={'0'}>A-Z</MenuItem>
                <MenuItem value={'1'}>Mayor Precio</MenuItem>
                <MenuItem value={'2'}>Menor Precio</MenuItem>
            </Select>
        </FormControl>
    );
}

// Pagination
function PaginationBar({ totalPages, index, handleChange }) {
  return (
    <>
      <Pagination 
        count={totalPages} 
        page={index} 
        onChange={handleChange} 
        color='primary'
        shape='rounded'
      />
    </>
  );
}

//Params catalogue function products, getAllProducts,
// Catalogue
export function Catalogue({ sortValue, changeSort }) {
    const classes = useStyles();
    const { products, pages, nextPage, page } = useSelector((state) => ({ ...state }))

    // Setting the params for getAllProducts Action
    const [productParams, setProductParams] = useState({
      name: null,
      category: null,
      filter: 'name',
      order: 'ASC',
    });

    //Sort products on store change
    function sortProducts() {};

    useEffect(() => {
      sortProducts();
    }, [sortValue])
    
    //Get the products from the store and charge them in the page
    const handleSortChange = event => {
      changeSort(event.target.value);
    };

    const handleChange = (event, value) => {
      
    }

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
                    />

                </div>
                <SortSelect value={sortValue} handleChange={handleSortChange}/>
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
              <PaginationBar 
                className={classes.pagination} 
                totalPages={pages} 
                index={page} 
                handleChange={handleChange}
              />
            </div>
        </Paper>
    )
};



export default Catalogue;