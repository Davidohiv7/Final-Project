import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';

export default function GoogleAuthError() {

    let classes = useStyles();
    // let history = useHistory();
    // let cookies = new Cookies()

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.close()
    //     }, 2000)
    // })

    return (
        <Box className={classes.root} display='flex' alignItems='center' justifyContent='center'>
            <Typography className={classes.title} variant="h3" color="initial">Sorry, we couldn't authenticate your account</Typography>
        </Box>
        );
  };