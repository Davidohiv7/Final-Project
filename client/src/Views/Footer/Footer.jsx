//Footer
import { Box, Container, Grid, Link, Avatar } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

// import Contact from "../Contact/Contact"
const Footer = () => {
  const classes = useStyles();

  return (
    <Box
      px={{ xs: 3, sm: 5 }}
      py={{ xs: 5, sm: 5 }}
      bgcolor="Black"
      color="white"
      className={classes.footer}
    >
      <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} align="center">
          <Box borderBottom={2}>How can we help you?</Box>
          <Box>
            <Link href="/contact" color="inherit">
              Contact
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} align="center">
          <Box borderBottom={2}>About Us</Box>
          <Box>
            <Link href="/devs" color="inherit">
              Devs
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} align='center'>
            <Avatar src='https://assets.soyhenry.com/henry-landing/assets/LOGO-REDES-01_og.jpg'/>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
};

export default Footer;
