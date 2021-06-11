import React, { useState } from 'react'
import useStyles from './styles';
import {
    Grid,
    TextField,
    Box,
    Button,
    FormControl,
 } from '@material-ui/core';
import onion from './../../assets/img/ONION.svg'

export default function LoginRegister() {
    let classes = useStyles();
    const [userName, setName] = useState('');
    const [userPassword, setPassword] = useState('');

    return (
        <Grid container spacing={0} className={classes.container}>
            <Grid item xs={6}>
                <img src="https://i.pinimg.com/736x/29/d4/0f/29d40f292671edd4bc5e2f68f9f4f3a6.jpg" alt="Cover" className={classes.image}/>
            </Grid>
            <Grid xs={6}>
                <Grid container justify='center'>
                    <img src={onion} alt="Cover" className={classes.logo}/>
                </Grid>
                <FormControl margin='dense'>
                    <Box className={classes.box}>
                        <TextField required variant='outlined' label='User Name' className={classes.textField} onChange={() => console.log('hi')}/>
                        <TextField required variant='outlined' label='Password' className={classes.textField} onChange={() => console.log('see ya later aligator')}/>
                    </Box>    
                    <Box className={classes.box}>
                        <Button className={classes.button} onClick={() => console.log("This is the local storage:")}>Log In</Button>
                    </Box>
                </FormControl>
            </Grid>
        </Grid>
    )
}

/*

                <Paper className={classes.paper}>
                    <FormControl fullWidth className={classes.sortForm}>
                        <Input id='eMail' />E-Mail
                        <Input id='Name' />Name
                        <Input id='lastName' />Last Name
                    </FormControl>
                </Paper>*/
