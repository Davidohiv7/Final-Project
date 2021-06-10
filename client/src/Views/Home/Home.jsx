
// React/Redux imports
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { getAllProducts } from './../../actions/actions';

// Material UI imports
import {
        Grid, 
        Paper, 
        Container,
        Link,
        List,
        ListItem,
      }
from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons'
import useStyles from './styles';

// Component imports
import { Catalogue } from './../../components/Catalogue/Catalogue'
//import FilterButton from '../../components/DropdownFilterButton/dropdownFilterButton'

//------Home-----//
function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, []
  )
  //this two const are just hardcoding the db, havent set it yet, but it is ready and seeded.
  const erase = (name) => {
    console.log(name)
  };

  const testErase = {
    arrayCategories: ["Veggies", "Fish", "Meat", "Fruits"],
    other: erase,
  }
  
  //on the drop down Menu we should make a map of the categories. Nothing has been set for that.

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.grid_container}>
        <Grid item xs={12}>
          <Paper className={classes.slide} elevation={3}>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.filter} elevation={3}>
            <Link href="/" className={classes.links}><HomeIcon /></Link>
            <List>
              {testErase.arrayCategories ? 
                testErase.arrayCategories.map(category => <ListItem><Link href="#" onClick={console.log(category)} className={classes.links}>
                  {category}
                </Link></ListItem>) :
                <p>No Such Category</p>}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9} className={classes.catalogueContainer}>
          <Paper elevation={3}>
            <Catalogue/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
      // products: state.products,
  };
}
function mapDispatchToProps(dispatch) {
  return {
      // getAllProducts: () =>  dispatch(getAllProducts()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
