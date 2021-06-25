import React, { useState } from "react";
//Material UI imports
import { Box, Typography, TextField, Button, Snackbar, Popover } from "@material-ui/core";
import { Send } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
//Styles and utils
import useStyles from './styles';
import { messageValidation, resetMessage } from '../../assets/utils/contactValidations'

const Contact = () => {
    const classes = useStyles();

    const [formInputs, setFormInputs] = useState({
        name: '',
        lastName: '',
        email: '',
        message: '',
    });
    const [errorsArray, setErrorsArray] = useState([]);
    const [messageSent, setMessageSent] = useState(false);
    const [messageErrorsSnackbar, setMessageErrorsSnackbar] = useState(false);
    const [errorsPopover, setSuccesErrorsPopover] = useState(false);
    const [errorsPopoverAnchor, setSuccesErrorsPopoverAnchor] = useState(null);

    const handleInputChange = function (e) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = function(e) {
        e.preventDefault()
        const inputErrors = messageValidation(formInputs)
        if (Object.keys(inputErrors).length === 0) {
            
            return setFormInputs(resetMessage)
        }
        setErrorsArray(Object.values(inputErrors).reduce((acc, v) => [...acc, ...v], []))
        setSuccesErrorsPopover(true)
        return setSuccesErrorsPopoverAnchor(e.currentTarget)
    }

    return (
        <Box p={5} m={5} display='flex' flexDirection='column' alignItems='center' bgcolor='secondary.main' className={classes.root}>
            <Typography variant="h4" color="initial">How can we help you?</Typography>
            <form onSubmit={e => handleSubmit(e)}>
                <Box display='flex' flexDirection='column' alignItems='center' className={classes.inputsContainer}>
                    <TextField
                        className={classes.input}
                        name="name"
                        label="First name"
                        variant="outlined"
                        value={formInputs.name}
                        onChange={handleInputChange}
                        size='small'
                    />
                    <TextField
                        className={classes.input}
                        name="lastName"
                        label="Last name"
                        variant="outlined"
                        value={formInputs.lastName}
                        onChange={handleInputChange}
                        size='small'
                    />
                    <TextField
                        className={classes.input}
                        name="email"
                        label="e-Mail"
                        variant="outlined"
                        value={formInputs.email}
                        onChange={handleInputChange}
                        size='small'
                        type='email'
                    />
                    <TextField
                        className={classes.input}
                        name="message"
                        label="Leave us a message. Max 150 characters"
                        variant="outlined"
                        value={formInputs.message}
                        onChange={handleInputChange}
                        multiline
                        rowsMax={4}
                        inputProps={{ maxLength: 150 }}
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
            </form>
            <Snackbar open={messageSent} autoHideDuration={3000} onClose={() => setMessageSent(false)} variant="filled">
                <Alert onClose={() => setMessageSent(false)} severity="success">
                    Your message has been sent
                </Alert>
            </Snackbar>

            <Snackbar open={messageErrorsSnackbar} autoHideDuration={3000} onClose={() => setMessageErrorsSnackbar(false)} variant="filled">
                <Alert onClose={() => setMessageErrorsSnackbar(false)} severity="error">
                    Not in my house.
                </Alert>
            </Snackbar>

            <Popover
                open={errorsPopover}
                anchorEl={errorsPopoverAnchor}
                onClose={() => setSuccesErrorsPopover(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                <Box p={2}>
                    {
                        errorsArray && errorsArray.map(e => {
                            return <Typography>- {e}</Typography>
                        })
                    }
                </Box>

            </Popover>
        </Box>
    );
};

export default Contact;
