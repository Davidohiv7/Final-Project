import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProducts } from './../../actions/home/home_actions';

/* eslint-disable */
// Material UI imports
import { Grid, Paper, Container  } from '@material-ui/core';
import useStyles from './styles';

// Component imports
import Catalogue from './../../components/Catalogue/Catalogue';
import HomeLeftBar from '../../components/HomeLeftBar/HomeLeftBar.jsx';
import Carousel from '../../components/Carousel/Carousel';



export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, []
  )

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} className={classes.grid_container}>
        <Grid item sm={12} className={classes.carousel}>
          <Paper className={classes.slide} elevation={3}>
            <Carousel />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2} className={classes.filterGrid}>
          <HomeLeftBar />
        </Grid>
        <Grid item xs={12} sm={10} className={classes.catalogueContainer}>
          <Paper elevation={3}>
            <Catalogue />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
