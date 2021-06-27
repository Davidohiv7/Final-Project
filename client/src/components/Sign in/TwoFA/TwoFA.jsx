import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
//Material UI Styles
import useStyles from './styles';
//Material UI Components
import { Box, Typography, TextField, Button, Popover, Snackbar, LinearProgress } from '@material-ui/core';
import { VpnLock, Undo, Loop } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
//actions
import { twofaSignIn, twofaSignIn2 } from '../../../actions/authentication/authentication_actions'
import { FINISH_TWOFA, AUTH_ERROR } from '../../../actions_types/authentication/authentication_actions_types'
//Custom functions
import { resetSignInInput, secsToTimer } from '../../../assets/utils/authentication'


export default function TwoFA( { formInputs, setFormInputs } ) {
    let classes = useStyles();

    const dispatch = useDispatch();
    const { authMessage, twofa } = useSelector((state) => ({ ...state.authenticationReducer }))

    const [codeTwoFa, setCodeTwoFa] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    });

    const [succesSignInSnackbar, setSuccesSignInSnackbar] = useState(false);
    const [errorSignInSnackbar, setErrorSignInSnackbar] = useState(false);

    const [error, setError] = useState('');
    const [errorPopover, setErrorsPopover] = useState(false);
    const [errorPopoverAnchor, setErrorPopoverAnchor] = useState(null);

    const [progress, setProgress] = useState(0);
    const [timer, setTimer] = useState(null);
    const [resendAttempts, setResendAttempts] = useState(1);

    const [verifyButtonStatus, setVerifyButtonStatus] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [resendButtondStatus, setResendButtonStatus] = useState(false);

    
    useEffect(() => {
        let time = 0
        function timerOn() {
            const timer = setInterval(() => {
                if(time < 90) {
                    time = time + 1
                    return setProgress(time)
                }
                setVerifyButtonStatus(true)
                clearInterval(timer)
            }, 1000);
            return timer
        }
        
        if(progress === 0) {
            const timer = timerOn()
            setTimer(timer)
        }
        
    }, [progress]);

    useEffect(() => {
        if(authMessage) {
            return setErrorSignInSnackbar(true);
        }
        if(!authMessage) {
            return setErrorSignInSnackbar(false);
        }
    }, [authMessage])

    useEffect(() => {
        if(twofa.attempts > 3) {
            setVerifying(true)
            setResendButtonStatus(true)
            dispatch({type: AUTH_ERROR, payload: 'Attempts limit reached, please sign in again'});
            setTimeout(() => dispatch({type: FINISH_TWOFA}), 3000)
        }
    }, [twofa.attempts])

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
            setVerifying(true)
            setTimeout(() => setVerifying(false), 3000)
            return dispatch(twofaSignIn2(formInputs, code)) 
        }
        setError('The code is not complete')
        setErrorsPopover(true)
        return setErrorPopoverAnchor(e.currentTarget)
    }

    function handleBack(e) {
        setFormInputs(resetSignInInput)
        dispatch({type: FINISH_TWOFA});
    }

    function handleResend(e) {
        setResendAttempts(resendAttempts + 1)
        setCodeTwoFa({
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            code5: '',
            code6: '',
        })
        if(resendAttempts === 3) {
            setResendButtonStatus(true)
            dispatch({type: AUTH_ERROR, payload: 'Resend attempts limit reached, please sign in again'});
            return setTimeout(() => dispatch({type: FINISH_TWOFA}), 3000)
        }
        setVerifyButtonStatus(false)
        clearInterval(timer)
        setProgress(0)
        dispatch(twofaSignIn(formInputs))
        setSuccesSignInSnackbar(true)
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
                            className={classes.verifyButton}
                            variant="contained"
                            color="primary"
                            startIcon={<VpnLock/>}
                            disabled={verifyButtonStatus || verifying }
                        >
                            verify code
                        </Button>
                        {verifyButtonStatus && <Typography variant="body2" align='center' color="primary">Get a new code by clicking on the button below</Typography>}
                        <Button
                            onClick={e => handleResend(e)}
                            className={classes.resendButon}
                            variant="contained"
                            color="primary"
                            startIcon={<Loop/>}
                            disabled={resendButtondStatus}
                        >
                            resend code
                        </Button>
                        
                    </Box>
                </form>
                
                <Box display="flex" alignItems="center" justifyContent='center' width="75%" mt={3}>
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={100 * (progress / 90)} />
                    </Box>
                    <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{secsToTimer(progress)}</Typography>
                    </Box>
                </Box>

                <Box>
                    <Button
                        onClick={e => handleBack(e)}
                        className={classes.backButton}
                        variant="contained"
                        color="primary"
                        startIcon={<Undo/>}
                    >
                        Back
                    </Button>
                </Box>
                

                <Popover
                    open={errorPopover}
                    className={classes.popover}
                    anchorEl={errorPopoverAnchor}
                    onClose={() => setErrorsPopover(false)}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                >

                    <Box p={2}>
                        {
                            error &&  <Typography color='primary' >{error}</Typography>
                        }
                    </Box>
                    
                </Popover>

                <Snackbar open={succesSignInSnackbar} autoHideDuration={3000} onClose={() => setSuccesSignInSnackbar(false)} variant="filled">
                    <Alert onClose={() => setSuccesSignInSnackbar(false)} severity="success">
                        A new code was sent to your mail
                    </Alert>
                </Snackbar>

                <Snackbar open={errorSignInSnackbar} autoHideDuration={3000} onClose={() => setErrorSignInSnackbar(false)} variant="filled">
                    <Alert onClose={() => setErrorSignInSnackbar(false)} severity="error">
                        {authMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </React.Fragment>
    )
}