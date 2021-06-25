/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import validate from 'validator';
import useStyles from './styles';

function PasswordReset() {
    const styles = useStyles();
    const [email, setEmail] = useState('');
    const [errorPresent, setErrorPresent] = useState(false);
    const [passwordRequested, setPasswordRequested] = useState(false);
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const [userId, setUserId] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [validationError, setValidationError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updated, setUpdated] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const getTokenFromQuery = () => {
        let query = queryString.parse(location.search);
        if(!query.token) {
            return null;
        } else {
            return query.token;
        }
    } 

    const goHome = () => {
        return history.push('/');
    }

    const handleSubmit = async () => {
        if(validate.isEmail(email)) {
            axios.post('http://localhost:3001/passwordReset/getKey', { email });
            setPasswordRequested(true);
            setErrorPresent(false);
        } else {
            setErrorPresent(true);
        }
    };

    const validatePassword = (pasword, confirmPassword) => {
        if(!pasword) return 'A password is required';
        if(pasword && !(/^.{8,}$/.test(pasword))) return 'Password must be 8 characters long minimum';
        if(pasword && !(/\d/.test(pasword))) return 'Password must contain at least one number';
        if(pasword && !(/[A-Z]/.test(pasword))) return 'Password must contain at least an upper case';
        if(pasword && (pasword !== confirmPassword)) return 'Passwords are different';
        return '';
    };

    const updatePassword = () => {
        let error = validatePassword(newPass, confirmPass);
        if(error === '') {
           setErrorMessage('');
           axios.put('http://localhost:3001/passwordReset/updatePass', { userId, newPass })
            .then(() => {
                setUpdated(true);
            })
            .catch(error => {
                setErrorPresent(true);
                setUpdated(true);
            })
        }
        else {
            setErrorMessage(error);
        }
    }

    const handleChange = event => {
        setEmail(event.target.value);
    }

    useEffect(() => {
        const token = getTokenFromQuery();
        if(token) {
            setTokenLoaded(true);
            axios.post('http://localhost:3001/passwordReset/verifyKey', { token })
                .then(({ data }) => {
                    setUserId(data.data.id);
                    console.log(userId);
                })
                .catch(error => {
                    setErrorPresent(true);
                    console.error(error);
                })
        }
        return () => {
            setPasswordRequested(false);
            setErrorPresent(false);
            setTokenLoaded(false);
            setUserId('');
            setValidationError(false);
            setNewPass('');
            setConfirmPass('');
            setUpdated(false);
        }
    }, []);

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            className={styles.root}
        >
            <Paper
                className={styles.container}
            >
                <Typography variant='h4' align='center'>
                    Forgot Password
                </Typography>
                {   
                    !tokenLoaded ?
                    (<>
                        <Typography className={styles.description}>
                            {passwordRequested ? "If an account exists for this email, we'll send you a link to restore your password." : "Please enter the account's e-mail address you want to password reset."}
                        </Typography>
                        <form>
                            <Box>
                                <TextField
                                    label="Your account's email address"
                                    variant='outlined'
                                    margin='dense'
                                    className={styles.emailInput}
                                    value={email}
                                    onChange={handleChange}
                                    error={errorPresent}
                                    helperText={errorPresent ? 'Please enter a valid email!' : ' '}
                                    autoComplete='email'
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={styles.inputBtn}
                                    onClick={handleSubmit}
                                >
                                    {passwordRequested ? 'Email sent!' : 'Reset Password'}
                                </Button>
                            </Box>
                        </form>
                    </>) :
                    (!errorPresent ? 
                        (!updated ? 
                            (<>
                                <Typography>Please enter your new password:</Typography>
                                <form className={styles.passwordForm}>
                                    <TextField
                                        type='password'
                                        value={newPass}
                                        variant='outlined'
                                        label='New password'
                                        margin='dense'
                                        className={styles.newPassInput}
                                        error={validationError}
                                        onChange={e => setNewPass(e.target.value)}
                                    />
                                    <TextField
                                        type='password'
                                        value={confirmPass}
                                        variant='outlined'
                                        label='Confirm new password'
                                        margin='dense'
                                        className={styles.newPassInput}
                                        error={validationError}
                                        onChange={e => setConfirmPass(e.target.value)}
                                    />
                                    <Typography>{ errorMessage ? errorMessage : ' '}</Typography>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={styles.submitBtn}
                                        onClick={updatePassword}
                                    >
                                        Update password
                                    </Button>
                                </form>
                            </>) 
                                :
                            (<>
                                <Typography>Your password has been updated!</Typography>
                                <Button
                                variant='contained'
                                color='primary'
                                onClick={goHome}
                                >
                                    Go home
                                </Button>
                            </>)
                        )
                            : 
                        (<>
                            <Typography>This link is not valid, or expired</Typography>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={goHome}
                            >
                                Go home
                            </Button>
                        </>)
                    )
                }
            </Paper>
        </Box>
    );
}

export default PasswordReset;