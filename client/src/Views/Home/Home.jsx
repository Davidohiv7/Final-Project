
// React/Redux imports
import React from 'react';
import { connect } from "react-redux";

// Material UI imports
import {
        Grid, 
        Paper, 
        Container,
      }
from '@material-ui/core';
import useStyles from './styles';

// Component imports
import { Catalogue } from './../../components/Catalogue/Catalogue'
import FilterButton from './../../components/FilterButton/filterButton'



//------Home-----//
function Home() {
  const classes = useStyles();

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
            <FilterButton props={testErase} title="Filter by Categories" />
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3}>
                Catalogue{/* <Catalogue/> */}
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
