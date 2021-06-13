import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getAllProducts } from './../../actions/home/home_actions';

// Material UI imports
import { Grid, Paper, Container  } from '@material-ui/core';
import useStyles from './styles';

// Component imports
import Catalogue from './../../components/Catalogue/Catalogue'
import HomeLeftBar from '../../components/HomeLeftBar/HomeLeftBar.jsx'


export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, []
  )

  

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.grid_container}>
        <Grid item xs={12}>
          <Paper className={classes.slide} elevation={3}>
          </Paper>
        </Grid>
        <Grid item xs={2} className={classes.filterGrid}>
          <HomeLeftBar/>
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
