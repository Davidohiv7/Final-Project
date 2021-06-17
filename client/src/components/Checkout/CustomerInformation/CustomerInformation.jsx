import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Box, Typography, Button, TextField, Popover} from '@material-ui/core'
//Styles
import useStyles from './styles';
//Custom functions
import { customerInformationValidation } from '../../../assets/utils/ordersInformationValidation'
//Actions
import { setShippingAdress } from '../../../actions/checkout/checkout_actions'

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

    const [errors, setErrors] = React.useState(['initial']);
    const [inputErrorsPopover, setInputErrorsPopover] = useState(false);
    const [inputErrorsPopoverAnchor, setInputErrorsPopoverAnchor] = useState(null);

    useEffect(() => {
        if(storeCustomerInformation && storeCustomerInformation.name) {
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

    function handleSubmit(e) {
        e.preventDefault()
        const inputErrors = customerInformationValidation(customerInformation)
        if(Object.keys(inputErrors).length === 0) {
            localStorage.setItem('customerInformation', JSON.stringify(customerInformation))
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
                        />

                        <TextField
                                name="zip"
                                label="Postal code"
                                variant="outlined"
                                value={customerInformation.zip}
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
                                value={customerInformation.neighborhood}
                                onChange={handleInputChange}
                                size='small'
                        />
                        <TextField
                                // className={classes.input}
                                name="city"
                                label="City"
                                variant="outlined"
                                value={customerInformation.city}
                                onChange={handleInputChange}
                                size='small'
                        />
                    </Box>

                </Box>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Confirm Information
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
    )
}