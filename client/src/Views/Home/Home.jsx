import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllProducts } from './../../actions/home/home_actions';
import { confirmMercadoPagoOrder } from './../../actions/checkout/checkout_actions';
import queryString from 'query-string';

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
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state.authenticationReducer }))

  const parsed = queryString.parse(location.search);

  useEffect(() => {
    dispatch(getAllProducts())
    if (parsed.status === 'approved') {
      dispatch(confirmMercadoPagoOrder(user));
    }
  }, []
  )

  

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.grid_container}>
        <Grid item xs={12}>
          <Paper className={classes.slide} elevation={3}>
            <Carousel />
          </Paper>
        </Grid>
        <Grid item xs={2} className={classes.filterGrid}>
          <HomeLeftBar />
        </Grid>
        <Grid item xs={10} className={classes.catalogueContainer}>
          <Paper elevation={3}>
            <Catalogue />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
