import React from 'react';
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

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

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
        <Grid item xs={8}>
          <Paper elevation={3}>
                Catalogo
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

