import React, { useEffect, useState } from 'react';
//Imports Material UI components:
import {Box, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
//Styles
import useStyles from './styles';
//Custom functions
import { readLocalStorageCart } from '../../../assets/utils/cartFunctions'

export default function  ConfirmOrder(props) {
    
    const classes = useStyles();

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        setCartProducts(readLocalStorageCart())
    }, [])

    function handleConfirmOrder(e) {
        console.log('Aqui terminaria el checkout')
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' m={2}>
            <Box mb={4}>
                <Typography variant="h3" color="primary">Confirm Order</Typography>
            </Box>
            <Box width="100%" justifyContent='center' ml={3}>
                <Typography variant="h6" className={classes.title} >
                    Order Detail
                </Typography>
                <div className={classes.demo}>
                    <List>
                        {cartProducts.map(ele =>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={ele.Images[0].url} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ele.name}
                                />
                            </ListItem>,
                        )}
                    </List>
                </div>

            </Box>
            <Typography variant="h5" color="primary">
                {`Total: $${props.subtotal.toFixed(2)}`}
            </Typography>
            <Button variant="contained" color="primary" onClick={(e) => handleConfirmOrder(e)}>
              Confirm Order
            </Button>
        </Box>  
    )
}