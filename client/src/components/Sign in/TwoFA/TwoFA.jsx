import React, { useEffect, useState } from 'react'
//Material UI Styles
import useStyles from './styles';
//Material UI Components
import { Box, Typography } from '@material-ui/core';


export default function TwoFA() {
    let classes = useStyles();


    const [codeTwoFa, setCodeTwoFa] = useState({
        code: '',
    });

    
    function handleTwoFaAuth(e) {
        console.log('handleTwoFaAuth')
    }

    return (
        <React.Fragment>
            <Typography>AQUI VA LO DEL CODIGO</Typography> 
        </React.Fragment>
    )
}