import React, { useState } from 'react';
//Imports Material UI components:
import {Box, Typography, Button} from '@material-ui/core'
//Styles
import useStyles from './styles';

export default function  MercadoPago() {
    
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width='100%'>
            <Typography variant="h5" color="primary">MercadoPago</Typography>
        </Box>  
    )
}