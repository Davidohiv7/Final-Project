import React from 'react'
import useStyles from './styles';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { mainValidation } from '../../assets/utils/authentication'


export default function SignUp() {
    let classes = useStyles();
    const [formInputs, setFormInputs] = React.useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleInputChange = function(e) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
            });
    }

    function handleSubmit() {
        const inputErrors = mainValidation(formInputs)
        if(Object.keys(inputErrors).length === 0) {
            return console.log('No errors')
        }
        return console.log(inputErrors)
    }


    return (
        <Box display='flex' flexDirection='column' alignItems='center' className={classes.root}>
            <Typography variant="h4" color="initial">Sign up</Typography>
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
                        startIcon={<Add />}
                        onClick={handleSubmit}
                    >
                        sign up
                    </Button>
                </Box>
        </Box>
    )
}