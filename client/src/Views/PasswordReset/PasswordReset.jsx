import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import validate from 'validator';
import useStyles from './styles';

function PasswordReset() {
    const styles = useStyles();
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState(false);
    const [passwordRequested, setPasswordRequested] = useState(false);

    const handleSubmit = async () => {
        if(validate.isEmail(email)) {
            axios.post('http://localhost:3001/passwordReset/getKey', { email });
            setPasswordRequested(true);
            setValidationError(false);
        } else {
            setValidationError(true);
        }
    };

    const handleChange = event => {
        setEmail(event.target.value);
    }

    useEffect(() => {
        setPasswordRequested(false);
        setValidationError(false);
        return () => {
            setPasswordRequested(false);
            setValidationError(false);
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
                    Resetting your password
                </Typography>
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
                            error={validationError}
                            helperText={validationError ? 'Please enter a valid email!' : ' '}
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
            </Paper>
        </Box>
    );
}

export default PasswordReset;