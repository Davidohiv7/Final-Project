import React from 'react'
import useStyles from './styles';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { VpnKey } from '@material-ui/icons';


export default function SignIn() {
    let classes = useStyles();
    const [formInputs, setFormInputs] = React.useState({
        email: '',
        password: '',
    });

    const handleInputChange = function(e) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
            });
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
                    >
                        sign in
                    </Button>
                </Box>
        </Box>
    )
}