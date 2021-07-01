import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, updateSearching, updateCategory } from '../../actions/home/home_actions';
import useStyles from './styles'
import { Grid, Paper, InputBase, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ProductCards from '../ProductCards/ProductCards.jsx'
import PaginationBar from './PaginationBar/PaginationBar.jsx'
import SortSelect from './SortSelect/SortSelect.jsx'

//Params catalogue function products, getAllProducts,
// Catalogue
export default function Catalogue({ autoComplete, setAutocomplete }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { searched, products, filter, order } = useSelector((state) => ({ ...state.homeReducer }));

    const handleSearchChange = value => {
      dispatch(getProducts({name: value, filter, order}));
      dispatch(updateSearching(value));
      dispatch(updateCategory(''));
      if (value.length > 0 && products) {
        setAutocomplete(true);
      } else {
        setAutocomplete(false);
      }
    };


    return (
        <Paper className={classes.catalogueMainContainer}>
            <div className={classes.searchSortContainer}> 
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <div className={classes.demo}>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        value={searched}
                    />
                        {
                          autoComplete && products.length > 1 &&
                          <List className={classes.autoCompleteList}>
                           {
                             products.map(product => {
                               return (
                                 <ListItem onClick={() => handleSearchChange(product.name)}>
                                   <ListItemText primary={product.name} />
                                 </ListItem>
                               )
                             })
                           }
                          </List>
                        }
                    </div>
                </div>
                <SortSelect/>
            </div>
            <Grid container spacing={1} className={classes.gridContainer}>
                {
                  products ?
                  products && products.map(product => {
                      return (
                        <Grid key={product.id} item> 
                          <ProductCards className={classes.productCard} product={product}/>
                        </Grid>
                      )
                  }) :
                  <Grid> 
                    <Typography variant="h5" color="primary">Sorry, we couldn't find any product. Try with a different word</Typography>
                  </Grid>
                }
            </Grid>
            <div className={classes.paginationContainer}>
              <PaginationBar/>
            </div>
        </Paper>
    )
};


