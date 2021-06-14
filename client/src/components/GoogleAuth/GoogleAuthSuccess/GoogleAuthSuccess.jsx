import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie'
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';


export default function GoogleAuthSuccess() {

    let classes = useStyles();

    useEffect(() => {
        setTimeout(() => {window.close()}, 2000)
    }, [])

    return (
        <Box className={classes.root} display='flex' alignItems='center' justifyContent='center'>
            <Typography className={classes.title} variant="h3" color="initial">Successful authentication</Typography>
        </Box>
        );
  };