
// React/Redux imports
import React from 'react';
<<<<<<< HEAD
import { connect } from "react-redux";

// Material UI imports
import {
        Grid, 
        Paper, 
        Container, 
        MenuList, 
        MenuItem, 
        ClickAwayListener, 
        Button, 
        Popper, 
        Grow
      }
from '@material-ui/core';
import useStyles from './styles';

// Component imports
import { Catalogue } from './../../components/Catalogue/Catalogue'



//------Home-----//
function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

=======
import {  Grid, 
          Paper, 
          Container, 
          MenuList, 
          MenuItem, 
          ClickAwayListener, 
          Button, 
          Popper, 
          Grow } from '@material-ui/core';
import useStyles from './HomeStyles';
//import { Catalogue } from './../../components/Catalogue/Catalogue'

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

>>>>>>> f1a4a9c3bd7445cf6f52d3bd7e7659d0623f8274
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
<<<<<<< HEAD
=======

>>>>>>> f1a4a9c3bd7445cf6f52d3bd7e7659d0623f8274
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

<<<<<<< HEAD
  //on the drop down Menu we should make a map of the categories. Nothing has been set for that.

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.grid_container}>
        <Grid item xs={12}>
          <Paper className={classes.slide} elevation={3}>
          </Paper>
        </Grid>
        <Grid item xs={2}>
=======
  //on the deployable Menu we should make a map of the categories. Nothing has been set for that.

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} className={classes.grid_container}>
        <Grid item xs={12}>
          <Paper className={classes.slide} elevation={3}>
            <img src="./SlideHotProducts.jpg" alt="Slide Hot Products" />
          </Paper>
        </Grid>
        <Grid item xs={4}>
>>>>>>> f1a4a9c3bd7445cf6f52d3bd7e7659d0623f8274
          <Paper className={classes.filter} elevation={3}>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              Filter By Category
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>Veggies</MenuItem>
                        <MenuItem onClick={handleClose}>Fruits</MenuItem>
                        <MenuItem onClick={handleClose}>Diary</MenuItem>
                        <MenuItem onClick={handleClose}>Top Selection</MenuItem>
                        <MenuItem onClick={handleClose}>Today's Deals</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Paper>
        </Grid>
<<<<<<< HEAD
        <Grid item xs={10}>
          <Paper elevation={3}>
                Catalogue{/* <Catalogue/> */}
=======
        <Grid item xs={8}>
          <Paper elevation={3}>
                Catalogo
>>>>>>> f1a4a9c3bd7445cf6f52d3bd7e7659d0623f8274
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
