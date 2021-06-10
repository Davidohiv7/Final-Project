import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, MenuItem, InputLabel, InputBase, FormControl, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
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
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'fit-content',
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


export function Catalogue({ sortValue, products, getAllProducts, changeSort }) {
    const [index, setIndex] = useState(1);
    const classes = useStyles();

    //
    const handleSortChange = event => {
      changeSort(event.target.value);
    };

    const changeIndex = (event, value) => {
      setIndex(value);
      console.log(value);
    }

    //Get All Products when loading the page
    useEffect(() => {
        if(!products) {
            getAllProducts();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Charge Products whenever the 'products' in store change
    useEffect(() => {
        chargeProducts();
    }, [products]);


    //Sort products on store change
    function sortProducts() {
      
    };

    useEffect(() => {
      sortProducts();
    }, [sortValue])
    
    //Get the products from the store and charge them in the page
    function chargeProducts() {

    };

    



    //Hardcoded product number
    let productsHard = ['1', '2', '3', '4', '5', '6', '7', '8'];




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
                {productsHard.map(product => {
                    return (
                      <Grid key={product} item> 
                        <ProductCards className={classes.productCard} />
                      </Grid>
                    )
                } )}

            </Grid>
            <div className={classes.paginationContainer}>
              <PaginationBar 
                className={classes.pagination} 
                totalPages={5} 
                index={index} 
                handleChange={changeIndex}
              />
            </div>
        </Paper>
    )
};

function mapStateToProps(state) {
    return {
        products: state.products,
        sortValue: state.sortValue
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getAllProducts: () =>  dispatch(getAllProducts()),
        changeSort: value => dispatch(changeSort(value))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalogue);