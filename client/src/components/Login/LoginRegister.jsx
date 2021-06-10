import React from 'react'
import useStyles from './LoginRegisterStyles';
import {
    Grid,
    Container,
    Paper,
    Input,
    FormControl,
 } from '@material-ui/core';

export default function LoginRegister() {
    let classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={0}>
                <Grid item xs>
                    <Paper className={classes.paper}>Foto</Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <FormControl fullWidth className={classes.sortForm}>
                            <Input id='eMail' />E-Mail
                            <Input id='Name' />Name
                            <Input id='lastName' />Last Name
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
