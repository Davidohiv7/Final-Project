//Footer
import { Box, Container, Grid, Link } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      bgcolor="Black"
      color="white"
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>About Us</Box>
            <Box>
              <Link href="/" color="inherit">
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>User</Box>
            <Box>
              <Link href="/" color="inherit">
                Log In
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Footer</Box>
            <Box>
              <Link href="/" color="inherit">
                More Info
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
