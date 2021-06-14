import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from './styles';
import { Box, Typography, TextField, Button, Snackbar, Popover } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { VpnKey } from '@material-ui/icons';

import { signIn } from '../../actions/authentication/authentication_actions'

import { signInValidation, resetSignInInput } from '../../assets/utils/authentication'

export default function SignIn() {
    let classes = useStyles();

    let history = useHistory();

    const dispatch = useDispatch();

    const { logged, authMessage } = useSelector((state) => ({ ...state.authenticationReducer }))

    const [formInputs, setFormInputs] = React.useState({
        email: '',
        password: '',
    });
    const [errorsArray, setErrorsArray] = useState([]);
    const [succesSignInSnackbar, setSuccesSignInSnackbar] = useState(false);
    const [errorSignInSnackbar, setErrorSignInSnackbar] = useState(false);
    const [errorsPopover, setSuccesErrorsPopover] = useState(false);
    const [errorsPopoverAnchor, setSuccesErrorsPopoverAnchor] = useState(null);

    useEffect(() => {
        if(logged) {
            history.push("/");
        }
    }, [logged])

    useEffect(() => {
        if(authMessage) {
            return setErrorSignInSnackbar(true);
        }
    }, [authMessage])

    const handleInputChange = function(e) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
            });
        }
    
    function handleSubmit(e) {
        e.preventDefault()
        const inputErrors = signInValidation(formInputs)
        if(Object.keys(inputErrors).length === 0) {
            dispatch(signIn(formInputs))
            return setFormInputs(resetSignInInput)
        }
        setErrorsArray(Object.values(inputErrors).reduce((acc, v) => [...acc, ...v], []))
        setSuccesErrorsPopover(true)
        return setSuccesErrorsPopoverAnchor(e.currentTarget)
    }


    return (
        <Box display='flex' flexDirection='column' alignItems='center' className={classes.root}>
            <Typography variant="h4" color="initial">Sign in</Typography>
            <form onSubmit={e => handleSubmit(e)}>
                <Box display='flex' flexDirection='column' alignItems='center' className={classes.inputsContainer}>
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
                        name="password"
                        label="Password"
                        variant="outlined"
                        value={formInputs.password}
                        onChange={handleInputChange}
                        size='small'
                        type='password'
                    />
                    <Button
                        type="submit"
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        startIcon={<VpnKey />}
                    >
                        sign in
                    </Button>
                    
                </Box>
            </form>
                

            <Snackbar open={succesSignInSnackbar} autoHideDuration={3000} onClose={() => setSuccesSignInSnackbar(false)} variant="filled">
                <Alert onClose={() => setSuccesSignInSnackbar(false)} severity="success">
                    Success login
                </Alert>
            </Snackbar>

            <Snackbar open={errorSignInSnackbar} autoHideDuration={3000} onClose={() => setErrorSignInSnackbar(false)} variant="filled">
                <Alert onClose={() => setErrorSignInSnackbar(false)} severity="error">
                    {authMessage}
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
    )
}