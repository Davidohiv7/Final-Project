import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from './styles';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { VpnKey } from '@material-ui/icons';

import { signIn } from '../../actions/authentication/authentication_actions'

import { signInValidation, resetSignInInput } from '../../assets/utils/authentication'

export default function SignIn() {
    let classes = useStyles();

    let history = useHistory();

    const dispatch = useDispatch();

    const { logged } = useSelector((state) => ({ ...state.authenticationReducer }))

    const [formInputs, setFormInputs] = React.useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if(logged) {
            history.push("/");
        }
    }, [logged])

    const handleInputChange = function(e) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
            });
        }
    
    function handleSubmit() {
        const inputErrors = signInValidation(formInputs)
        if(Object.keys(inputErrors).length === 0) {
            dispatch(signIn(formInputs))
            return setFormInputs(resetSignInInput)
        }
        return console.log(inputErrors)
    }


    return (
        <Box display='flex' flexDirection='column' alignItems='center' className={classes.root}>
            <Typography variant="h4" color="initial">Sign in</Typography>
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
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        startIcon={<VpnKey />}
                        onClick={handleSubmit}
                    >
                        sign in
                    </Button>
                </Box>
        </Box>
    )
}