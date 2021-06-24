//Footer
import { Box, Container, Grid, Link, Avatar } from "@material-ui/core";
import React from "react";
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      bgcolor="Black"
      color="white"
    >
      <Container maxWidth="lg" >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={5}>
            <Box borderBottom={1} align="center">
              <Link href="/contact" className={classes.link}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box borderBottom={1} align="center">
              <Link href="/developers" className={classes.link}>
                Developers
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} align="center">
            <Avatar src="https://assets.soyhenry.com/henry-landing/assets/LOGO-REDES-01_og.jpg" className={classes.logo}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
