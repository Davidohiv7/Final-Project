import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, MenuItem, InputLabel, InputBase, FormControl, Select } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
import { getAllProducts } from '../../actions/actions'
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
    }
  }));

function SortSelect(props) {
    const classes = useStyles();
    const { handleChange, value } = props;
    return (
        <FormControl fullWidth className={classes.sortForm}>
            <InputLabel id='sortLabel'>Ordenar por...</InputLabel>
            <Select
                labelId='sortLabel'
                className={classes.select}
                value={value}
                onChange={handleChange}
            >
                <MenuItem value={null}>-</MenuItem>
                <MenuItem value={0}>A-Z</MenuItem>
                <MenuItem value={1}>Mayor Precio</MenuItem>
                <MenuItem value={2}>Menor Precio</MenuItem>
            </Select>
        </FormControl>
    );
}


export function Catalogue({ products, getAllProducts }) {
    const [sort, setSort] = useState();
    
    const classes = useStyles();
    
    //
    const handleSortChange = event => {
      setSort(event.target.value);
    };

    //Get All Products when loading the page
    useEffect(() => {
        if(!products) {
            getAllProducts();
        };
    }, []);
    
    //Charge Products whenever the 'products' in store change
    useEffect(() => {
        chargeProducts();
    }, [products]);
    
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
                <SortSelect value={sort} handleChange={handleSortChange}/>
            </div>
            <Grid container spacing={1} className={classes.gridContainer}>
                {productsHard.map(product => {
                    return (
                      <Grid item> 
                        <ProductCards className={classes.productCard} />
                      </Grid>
                    )
                } )}
               
            </Grid>
            <div>
              {/* <Pagination /> */}
            </div>
        </Paper>
    )
};

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getAllProducts: () =>  dispatch(getAllProducts()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalogue);