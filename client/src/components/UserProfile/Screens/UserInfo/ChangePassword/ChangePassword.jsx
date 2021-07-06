import React, { useState }from "react";
// Material UI imports
import { Box, Typography, Button, Popover, TextField, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
//Styles
import useStyles from "./styles";
//Custom functions
import { changePasswordValidation }  from '../../../../../assets/utils/authentication'
//axios
import axios from 'axios'


export default function ChangePassword( { handleCloseModal } ) {

    const apiURL = process.env.REACT_APP_API_URL

    const classes = useStyles();

    const [changePasswordInput, setChangePasswordInput] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [errors, setErrors] = React.useState(['initial']);
    const [inputErrorsPopover, setInputErrorsPopover] = useState(false);
    const [inputErrorsPopoverAnchor, setInputErrorsPopoverAnchor] = useState(null);

    const [updateMessage, setUpdateMessage] = useState('');
    const [updateSuccessSnackBar, setUpdateSuccessSnackBar] = useState(false);
    const [updateErrorSnackBar, setUpdateErrorSnackBar] = useState(false);

    const handleInputChange = function(e) {
        setChangePasswordInput({
            ...changePasswordInput,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const inputErrors = changePasswordValidation(changePasswordInput)
        if(Object.keys(inputErrors).length === 0) {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.post(apiURL + "/user/change_password", { passwords: {...changePasswordInput} }, { headers: { 'Authorization': jwt }} )
                const data = response.data.data
                if(data.success) {
                    setUpdateMessage(data.message)
                    setUpdateSuccessSnackBar(true)
                    return setTimeout(() => handleCloseModal(), 3000)
                }
            } catch (error) {
                if(error.response.data.data.message) {
                    setChangePasswordInput({
                        oldPassword: '',
                        newPassword: '',
                        confirmNewPassword: '',     
                    })
                    setUpdateMessage(error.response.data.data.message)
                    return setUpdateErrorSnackBar(true)
                }
                setChangePasswordInput({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',     
                })
                return setUpdateMessage('Sorry, we couldn`t connect the server')
            }
        }
        setErrors(Object.values(inputErrors).reduce((acc, v) => [...acc, ...v], []))
        setInputErrorsPopover(true)
        return setInputErrorsPopoverAnchor(e.currentTarget)
    }

    return (
        <Box className={classes.root}>
            <form onSubmit={e => handleSubmit(e)}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' m={2}>
                    <Box mb={4}>
                        <Typography variant="h3" color="primary">Change your password: </Typography>
                    </Box>

                    <Box display='flex' width="100%" justifyContent='flex-start' ml={5}>
                        <Typography variant="h6" color="initial">Don't forget your new password in the next sign in </Typography>
                    </Box>

                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width="100%">

                            <TextField
                                className={classes.input}
                                name="oldPassword"
                                label="Current password"
                                variant="outlined"
                                value={changePasswordInput.oldPassword}
                                onChange={handleInputChange}
                                size='small'
                                type='password'
                            />

                            <TextField
                                className={classes.input}
                                name="newPassword"
                                label="New password"
                                variant="outlined"
                                value={changePasswordInput.newPassword}
                                onChange={handleInputChange}
                                size='small'
                                type='password'
                            />

                            <TextField
                                className={classes.input}
                                name="confirmNewPassword"
                                label="Confirm new password"
                                variant="outlined"
                                value={changePasswordInput.confirmNewPassword}
                                onChange={handleInputChange}
                                size='small'
                                type='password'
                            />

                    </Box>
                    <Box mt={4}>
                        <Button variant="contained" color="primary" type="submit">
                            Change password
                        </Button>
                    </Box>
                    <Popover
                        open={inputErrorsPopover}
                        anchorEl={inputErrorsPopoverAnchor}
                        onClose={() => setInputErrorsPopover(false)}
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
                                errors.map(p => {
                                    return <Typography>- {p}</Typography>
                                })
                            }
                        </Box>
                    </Popover>
                    </Box>  
            </form>

            <Snackbar open={updateSuccessSnackBar} autoHideDuration={3000} onClose={() => setUpdateSuccessSnackBar(true)} variant="filled">
                <Alert onClose={() => setUpdateSuccessSnackBar(true)} severity="success">
                    {updateMessage}
                </Alert>
            </Snackbar>

            <Snackbar open={updateErrorSnackBar} autoHideDuration={3000} onClose={() => setUpdateErrorSnackBar(false)} variant="filled">
                <Alert onClose={() => setUpdateErrorSnackBar(false)} severity="error">
                    {updateMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}