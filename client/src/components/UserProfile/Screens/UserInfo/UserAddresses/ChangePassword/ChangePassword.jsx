import React, { useState }from "react";
// Material UI imports
import { Box, Typography, Button, Popover, TextField } from "@material-ui/core";
//Styles
import useStyles from "./styles";
//Custom functions
import { changePasswordValidation }  from '../../../../../../assets/utils/authentication'
//axios
import axios from 'axios'


export default function ChangePassword( { handleCloseModal } ) {

    const classes = useStyles();

    const [changePasswordInput, setChangePasswordInput] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [errors, setErrors] = React.useState(['initial']);
    const [inputErrorsPopover, setInputErrorsPopover] = useState(false);
    const [inputErrorsPopoverAnchor, setInputErrorsPopoverAnchor] = useState(null);

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
            return console.log(changePasswordInput)
            // try {
            //     // const response = await axios.post("http://localhost:3001/shippingaddress/add", { ...shippingAddress }, { headers: { 'Authorization': jwt }} )
            //     // const userAddresses = response.data.data.userAddresses
            //     // return handleCloseModal()
            // } catch (error) {
            //     console.log(error)
            // }
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
                        <Typography variant="h6" color="initial">Don't forget your new password in the nex sign in </Typography>
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
        </Box>
    )
}