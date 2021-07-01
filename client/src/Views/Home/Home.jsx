import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from './../../actions/home/home_actions';
import { getFavorites } from './../../actions/favorites/favorites_actions'

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

  const { user } = useSelector((state) => ({ ...state.authenticationReducer }))
  const { favorites } = useSelector((state) => ({ ...state.wishlistReducer }))

  const dispatch = useDispatch();
  const [autoComplete, setAutocomplete] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts())
  }, []
  )

  useEffect(() => {
    if(user) {
      dispatch(getFavorites(user.email))
    }
  }, [user]
  )

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} className={classes.grid_container}>
        <Grid item sm={12} className={classes.carousel} p={0}>
          <Paper className={classes.slide} elevation={3}>
            <Carousel />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2} className={classes.filterGrid}>
          <HomeLeftBar setAutocomplete={setAutocomplete} />
        </Grid>
        <Grid item xs={12} sm={10} className={classes.catalogueContainer}>
          <Paper elevation={3}>
            <Catalogue autoComplete={autoComplete} setAutocomplete={setAutocomplete}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
