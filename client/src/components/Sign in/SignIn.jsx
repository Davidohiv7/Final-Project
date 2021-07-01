//React Imports
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//Material UI Imports
import useStyles from './styles';
import { Box, Link, Typography, TextField, Button, Snackbar, Popover } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { VpnKey } from '@material-ui/icons';
//Components
import GoogleAuth from '../GoogleAuth/GoogleAuth'
import TwoFA from './TwoFA/TwoFA'
//Actions
import { twofaSignIn } from '../../actions/authentication/authentication_actions'
//Custom functions
import { signInValidation } from '../../assets/utils/authentication'

export default function SignIn() {
    let classes = useStyles();

    let history = useHistory();

    const dispatch = useDispatch();

    const { logged, authMessage, twofa } = useSelector((state) => ({ ...state.authenticationReducer }))

    const [formInputs, setFormInputs] = React.useState({
        email: '',
        password: '',
    });
    const [errorsArray, setErrorsArray] = useState([]);
    const [succesSignInSnackbar, setSuccesSignInSnackbar] = useState(false);
    const [errorSignInSnackbar, setErrorSignInSnackbar] = useState(false);
    const [errorsPopover, setSuccesErrorsPopover] = useState(false);
    const [errorsPopoverAnchor, setSuccesErrorsPopoverAnchor] = useState(null);
    /* eslint-disable */
    useEffect(() => {
        if(logged) {
            history.push("/");
        }
    }, [logged])

    useEffect(() => {
        if(authMessage) {
            return setErrorSignInSnackbar(true);
        }
        if(!authMessage) {
            return setErrorSignInSnackbar(false);
        }
    }, [authMessage])
    /* eslint-enable */

    const handleInputChange = function(e) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
            });
        }

    // EL ANTIGUO HANDLE SUBMIT, QUE SEGURAMENTE DEBERA IR A TWOFA
    // function handleSubmit(e) {
    //     e.preventDefault()
    //     const inputErrors = signInValidation(formInputs)
    //     if(Object.keys(inputErrors).length === 0) {
    //         dispatch(signIn(formInputs))
    //         return setFormInputs(resetSignInInput)
    //     }
    //     setErrorsArray(Object.values(inputErrors).reduce((acc, v) => [...acc, ...v], []))
    //     setSuccesErrorsPopover(true)
    //     return setSuccesErrorsPopoverAnchor(e.currentTarget)
    // }
    

    function handleSubmit(e) {
        e.preventDefault()
        const inputErrors = signInValidation(formInputs)
        if(Object.keys(inputErrors).length === 0) {
            return dispatch(twofaSignIn(formInputs))
        }
        setErrorsArray(Object.values(inputErrors).reduce((acc, v) => [...acc, ...v], []))
        setSuccesErrorsPopover(true)
        return setSuccesErrorsPopoverAnchor(e.currentTarget)
    }

    function resetPassword(e) {
        e.preventDefault();
        history.push("/passwordReset");
    }

    return (
        <React.Fragment>
            {
                twofa.status ? 
                <TwoFA formInputs={formInputs} setFormInputs={setFormInputs} setSuccesErrorsPopover={setSuccesErrorsPopover} setErrorsArray={setErrorsArray} setSuccesErrorsPopoverAnchor={setSuccesErrorsPopoverAnchor}/> :
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
                                  
                            <Link
                                className={classes.forgotPassAnchor}
                                href="#"
                                onClick={resetPassword}
                            >
                                Forgot password?
                            </Link>
                                  
                            <Button
                                type="submit"
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                startIcon={<VpnKey />}
                            >
                                sign in
                            </Button>
                            
                            <Typography variant="body1" > or </Typography>

                            <GoogleAuth/>
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
            }
        </React.Fragment>
    )
}