import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, MenuItem, InputLabel, InputBase, FormControl, Select } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
import { getAllProducts } from '../../actions/actions'


// Styles
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    catalogueMainContainer: {
        width: '60%',
        display: 'flex',
    },
    searchSortContainer: {
      display: 'flex',  
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
    },
    search: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
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
      minWidth: 150
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
                value={value}
                onChange={handleChange}
            >
                <MenuItem value={0}>Predeterminado</MenuItem>
                <MenuItem value={1}>Mayor Precio</MenuItem>
                <MenuItem value={2}>Menor Precio</MenuItem>
            </Select>
        </FormControl>
    );
}


export function Catalogue({ products, getAllProducts }) {
    const [sort, setSort] = useState(0);
    
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
            <Grid>
                        
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