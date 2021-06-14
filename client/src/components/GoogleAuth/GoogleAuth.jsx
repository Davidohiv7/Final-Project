import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Box, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import GoogleButton from 'react-google-button'
import { useHistory } from "react-router-dom";
import useStyles from './styles';
import { Cookies } from 'react-cookie'

import { GOOGLE_AUTH } from '../../actions_types/authentication/authentication_actions_types'

export default function GoogleAuth() {

    let classes = useStyles();

    let history = useHistory();

    let cookies = new Cookies()

    let dispatch = useDispatch();

    const [errorSignInSnackbar, setErrorSignInSnackbar] = useState(false);

    const handleGoogleLogIn = () => {
        const googleAuthURL = 'http://localhost:3001/googleAuth/signin'
        const newWindow = window.open(googleAuthURL, 'blank','width=500,height=600')

        if(newWindow) {
            let timer = setInterval(() => {
                if(newWindow.closed) {
                    const jwt = cookies.get('jwt')
                    if(jwt) {
                        localStorage.setItem('jwt', `Bearer ${jwt}`)
                        cookies.remove('jwt')
                        dispatch({type: GOOGLE_AUTH})
                        history.push('/')
                        return clearInterval(timer)
                    }
                    setErrorSignInSnackbar(true)
                    clearInterval(timer)
                }
            }, 500)
        }
        
    }

    return (
        <Box>
            <GoogleButton
                label='Sign In with Google'
                style={{  
                    width: 250,
                }}
                onClick={() => handleGoogleLogIn()}
            />

            <Snackbar open={errorSignInSnackbar} autoHideDuration={3000} onClose={() => setErrorSignInSnackbar(false)} variant="filled">
                <Alert onClose={() => setErrorSignInSnackbar(false)} severity="error">
                    We couldn't validate your account, please try again
                </Alert>
            </Snackbar>
        </Box>
    );
};