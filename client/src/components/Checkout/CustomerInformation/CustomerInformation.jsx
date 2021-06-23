import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Box, Typography, Button, TextField, Popover, Select, MenuItem, FormControl, InputLabel} from '@material-ui/core'
//Styles
import useStyles from './styles';
//Custom functions
import { customerInformationValidation } from '../../../assets/utils/ordersInformationValidation'
//Actions
import { setShippingAdress } from '../../../actions/checkout/checkout_actions'
//axios
import axios from 'axios'

export default function  CustomerInformation({activeStep, setActiveStep }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { payment } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { user } = useSelector((state) => ({ ...state.authenticationReducer }))
    const storeCustomerInformation = useSelector(state => state.checkoutReducer.customerInformation)

    const [customerInformation, setCustomerInformation] = useState({
        street: '',
        neighborhood: '',
        city: '',
        zip: '',
    });

    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    const [errors, setErrors] = React.useState(['initial']);
    const [inputErrorsPopover, setInputErrorsPopover] = useState(false);
    const [inputErrorsPopoverAnchor, setInputErrorsPopoverAnchor] = useState(null);

    useEffect(() => {
        const getUserAddresses = async () => {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.get("http://localhost:3001/shippingaddress/", { headers: { 'Authorization': jwt }} )
                const userAddresses = response.data.data.userAddresses
                return setSavedAddresses(userAddresses)
            } catch (error) {
                console.log(error)
            }
        }
        getUserAddresses()
    }, [])

    useEffect(() => {
        if(storeCustomerInformation.street) {
            setCustomerInformation(storeCustomerInformation)
        }
      }, [])

    useEffect(() => {
        if(payment.state) {
            setActiveStep(activeStep + 1)
        }
      }, [])

    const handleInputChange = function(e) {
        setCustomerInformation({
            ...customerInformation,
            [e.target.name]: e.target.value
        });
    }

    function handleAddressSelectChange(e){
        setSelectedAddress(e.target.value)
        if(!e.target.value) {
            return setCustomerInformation({
                street: '',
                neighborhood: '',
                city: '',
                zip: '',
            })
        }
        
        setCustomerInformation({
            street: e.target.value.street,
            neighborhood: e.target.value.neighborhood,
            city: e.target.value.city,
            zip: e.target.value.zip,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const inputErrors = customerInformationValidation(customerInformation)
        if(Object.keys(inputErrors).length === 0) {
            dispatch(setShippingAdress(customerInformation))
            return setActiveStep(activeStep + 1)
        }
        setErrors(Object.values(inputErrors).reduce((acc, v) => [...acc, ...v], []))
        setInputErrorsPopover(true)
        return setInputErrorsPopoverAnchor(e.currentTarget)
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' m={2}>
                <Box mb={4}>
                    <Typography variant="h3" color="primary">Customer Information</Typography>
                </Box>
                <Box display="flex" justifyContent="space-around" alignItems="center" width="100%" my={3}>
                    <Box>
                        {/* Aqui borre los input de name, lastname e email porque ya vendran los datos del usuario */}
                        <Typography variant="h6" color="initial">{user.name} please fill the shipping address information for your order </Typography>
                    </Box>
                </Box>

                <Box display='flex' width="100%" justifyContent='flex-start' ml={3}>
                    <Typography variant="h5" color="initial">Shipping adress: </Typography>
                </Box>

                <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="93%" mb={2} mt={3}>
                        <TextField
                            className={classes.address}
                            name="street"
                            label="Address"
                            variant="outlined"
                            value={customerInformation.street}
                            onChange={handleInputChange}
                            size='small'
                            disabled={selectedAddress}
                        />

                        <TextField
                                name="zip"
                                label="Postal code"
                                variant="outlined"
                                value={customerInformation.zip}
                                onChange={handleInputChange}
                                size='small'
                                disabled={selectedAddress}
                        />

                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center" width="93%" my={1}>
                        <TextField
                                // className={classes.input}
                                name="neighborhood"
                                label="Neighborhood"
                                variant="outlined"
                                value={customerInformation.neighborhood}
                                onChange={handleInputChange}
                                size='small'
                                disabled={selectedAddress}
                        />
                        <TextField
                                // className={classes.input}
                                name="city"
                                label="City"
                                variant="outlined"
                                value={customerInformation.city}
                                onChange={handleInputChange}
                                size='small'
                                disabled={selectedAddress}
                        />
                    </Box>

                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Confirm Information
                    </Button>
                    {
                       savedAddresses.length > 0 &&  
                        <FormControl variant="outlined" className={classes.formControl} size='small'>
                            <InputLabel>Saved Addresses</InputLabel>
                            <Select
                                value={selectedAddress}
                                onChange={handleAddressSelectChange}
                                label="Saved addresses"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    savedAddresses.map( address => {
                                        return (
                                            <MenuItem value={address}>{address.street}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    }
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
    )
}