import React, { useState } from "react";
import useStyles from "./styles";
import leftImage from "../../assets/img/auth_bg.png";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Switch,
} from "@material-ui/core";
import SignIn from "../../components/Sign in/SignIn";
import SignUp from "../../components/Sign up/SignUp";

export default function Authentication() {
  let classes = useStyles();
  const [switchState, setSwitchState] = useState(false);

  return (
    <Box
      bgcolor="secondary.main"
      mt={6}
      m={5}
      p={5}
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper className={classes.container} elevation={24} variant="elevation">
        <Grid
          flexDirecion="row"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.height100}
        >
          <Grid item md={6} className={classes.heightCardMedia}>
            <Card className={classes.height100}>
              <CardMedia
                className={classes.height100}
                title="auth_left_side"
                image={leftImage}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} className={classes.height100}>
            <Card className={classes.height100}>
              <CardContent className={classes.height100}>
                <Box className={classes.height100}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Typography variant="span" color="initial">
                      Sign in
                    </Typography>
                    <Switch
                      color="primary"
                      checked={switchState}
                      onChange={() => setSwitchState(!switchState)}
                    />
                    <Typography variant="body1" color="initial">
                      Sign up
                    </Typography>
                  </Box>
                  {switchState ? <SignUp /> : <SignIn />}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
