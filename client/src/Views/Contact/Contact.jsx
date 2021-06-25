import React, { useState } from "react";
//Material UI imports
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import useStyles from "./styles";

const Contact = () => {
  const classes = useStyles();

  const [formInputs, setFormInputs] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleInputChange = function (e) {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      p={5}
      m={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="secondary.main"
      className={classes.root}
    >
      <Typography variant="h4" color="initial">
        How can we help you?
      </Typography>
      <FormControl p={5}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classes.inputsContainer}
        >
          <TextField
            className={classes.input}
            name="name"
            label="First name"
            variant="outlined"
            value={formInputs.name}
            onChange={handleInputChange}
            size="small"
          />
          <TextField
            className={classes.input}
            name="lastName"
            label="Last name"
            variant="outlined"
            value={formInputs.lastName}
            onChange={handleInputChange}
            size="small"
          />
          <TextField
            className={classes.input}
            name="email"
            label="e-Mail"
            variant="outlined"
            value={formInputs.email}
            onChange={handleInputChange}
            size="small"
            type="email"
          />
          <TextField
            className={classes.input}
            name="message"
            label="Leave us a message"
            variant="outlined"
            multiline
            value={formInputs.message}
            onChange={handleInputChange}
            size="small"
            type="password"
          />
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<Send />}
          >
            Send
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Contact;
