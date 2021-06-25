import React, { useEffect, useState } from 'react'
//Material UI Styles
import useStyles from './styles';
//Material UI Components
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { VpnLock } from '@material-ui/icons'


export default function TwoFA( { formInputs } ) {
    let classes = useStyles();


    const [codeTwoFa, setCodeTwoFa] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    });

    const handleInputChange = function(e) {
        const regex = /^(?:[1-9]\d*|\d)$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            setCodeTwoFa({
                ...codeTwoFa,
                [e.target.name]: e.target.value
            });
        }
    }

    
    function handleTwoFaAuthSubmit(e) {
        e.preventDefault()
        const code = Object.values(codeTwoFa).join('')
        if(code.length === 6) {
            return console.log(code)
        }
        console.log('falta')
    }

    return (
        <React.Fragment>
            <Box display='flex' flexDirection='column' alignItems='center' className={classes.root}>
                <Typography variant="h4" color="initial">2FA Email</Typography>
                <Box mt={6} mb={2}>
                    <Typography variant="body1" color="initial">We sent a 6-digit code to your email</Typography>
                </Box>
                
                <form onSubmit={e => handleTwoFaAuthSubmit(e)}>
                    <Box display='flex' flexDirection='column' alignItems='center' className={classes.inputsContainer}>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            {
                                Object.values(codeTwoFa).map((code, i) => {
                                    return (
                                        <TextField
                                            className={classes.input}
                                            name={`code${i + 1}`}
                                            variant="outlined"
                                            value={codeTwoFa[`code${i + 1}`]}
                                            onChange={handleInputChange}
                                            size='small'
                                            inputProps={{ 
                                                maxLength: 1,
                                                inputMode: 'numeric', 
                                                pattern: '[0-9]*'
                                            }}
                                            inputRef={(input) => {
                                                if((i + 1) === 1 ? codeTwoFa[`code${i + 1}`] : codeTwoFa[`code${i}`]) {
                                                    input && input.focus();
                                                }
                                            }}
                                        />
                                    )
                                })
                            }
                        </Box>
                        
                        <Button
                            type="submit"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<VpnLock />}
                        >
                            verify code
                        </Button>
                        
                    </Box>
                </form>
            </Box>
        </React.Fragment>
    )
}