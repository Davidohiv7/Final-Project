//react imports
import React, { useState } from "react";

// Material UI imports
import {
  Grid,
  Container,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";

//child components imports
import TableDisplay from "./Screens/TableDisplay";
import UserInfo from "./Screens/UserInfo";

export default function Home() {
  const classes = useStyles();
  
  //local state used for the different screen displays
  const [screenDisplay, setScreenDisplay] = useState("orderHistory");

  //function to display the different screens
  function displayScreens() {
    if(screenDisplay==='orderHistory') return (<TableDisplay/>)
    if(screenDisplay==='accountConfig') return (<UserInfo />)
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={2} className={classes.filterGrid}>
          <CardContent align="center">
            <Typography
              align="center"
              variant="h5"
              color="secondary"
              display="inline"
            >
              Username
            </Typography>
            <Avatar className={classes.profilePic}></Avatar>
            <Button className={classes.button} onClick={() => setScreenDisplay('orderHistory')}> Order History </Button>
            <Button className={classes.button} onClick={() => setScreenDisplay('accountConfig')}> Account Configuration</Button>
            <Box className={classes.BoxLogOut}>
              <Button className={classes.button}> Log Out </Button>
            </Box>
          </CardContent>
        </Grid>
        <Grid className={classes.screen} item xs={9}>
            {displayScreens()}
        </Grid>
      </Grid>
    </Container>
  );
}
