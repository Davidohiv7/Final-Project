import React, { useState }from "react";
// Material UI imports
import { Box, Typography, Button, Popover, TextField } from "@material-ui/core";
//Styles
import useStyles from "./styles";
//Custom functions
import { addressValidation }  from '../../../../../../assets/utils/ordersInformationValidation'
//axios
import axios from 'axios'


export default function AddAddress( { setUserAddresses, handleCloseModal } ) {

    const classes = useStyles();

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        neighborhood: '',
        city: '',
        zip: '',
    });

    const [errors, setErrors] = React.useState(['initial']);
    const [inputErrorsPopover, setInputErrorsPopover] = useState(false);
    const [inputErrorsPopoverAnchor, setInputErrorsPopoverAnchor] = useState(null);

    const handleInputChange = function(e) {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const inputErrors = addressValidation(shippingAddress)
        if(Object.keys(inputErrors).length === 0) {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.post("http://localhost:3001/shippingaddress/add", { ...shippingAddress }, { headers: { 'Authorization': jwt }} )
                const userAddresses = response.data.data.userAddresses
                setUserAddresses(userAddresses)
                return handleCloseModal()
            } catch (error) {
                console.log(error)
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
                        <Typography variant="h3" color="primary">Add a new addres:</Typography>
                    </Box>

                    <Box display='flex' width="100%" justifyContent='flex-start' ml={5}>
                        <Typography variant="h6" color="initial">Please complete all the fields </Typography>
                    </Box>

                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width="100%">
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="93%" mb={2} mt={3}>
                            <TextField
                                className={classes.address}
                                name="street"
                                label="Address"
                                variant="outlined"
                                value={shippingAddress.street}
                                onChange={handleInputChange}
                                size='small'
                            />

                            <TextField
                                    name="zip"
                                    label="Postal code"
                                    variant="outlined"
                                    value={shippingAddress.zip}
                                    onChange={handleInputChange}
                                    size='small'
                            />

                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center" width="93%" my={1}>
                            <TextField
                                    // className={classes.input}
                                    name="neighborhood"
                                    label="Neighborhood"
                                    variant="outlined"
                                    value={shippingAddress.neighborhood}
                                    onChange={handleInputChange}
                                    size='small'
                            />
                            <TextField
                                    // className={classes.input}
                                    name="city"
                                    label="City"
                                    variant="outlined"
                                    value={shippingAddress.city}
                                    onChange={handleInputChange}
                                    size='small'
                            />
                        </Box>

                    </Box>
                    <Box mt={4}>
                        <Button variant="contained" color="primary" type="submit">
                            submit address
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