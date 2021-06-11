import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Imports Material UI components:
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
//Material UI icons
import { Delete, LocalMall } from '@material-ui/icons/';
//Custom functions
import { readLocalStorageCart, modifyQuantity, deleteProductFromCart } from '../../assets/utils/cartFunctions'





export default function Cart() {

    const classes = useStyles();
    const [cartProducts, setCartProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0); 

    useEffect(() => {
        setCartProducts(readLocalStorageCart())
    }, [])

    useEffect(() => {
        if(cartProducts.length > 0) {
            return setSubtotal(cartProducts.map(p => p.price * p.quantity).reduce((acc, v) => acc + v))
        }
        setSubtotal(0)
    }, [cartProducts])

    function handleQuantityChange(product, e) {
        modifyQuantity(product, Number(e.target.value))
        setCartProducts(readLocalStorageCart())
    }

    function handleDelete(product) {
        deleteProductFromCart(product)
        setCartProducts(readLocalStorageCart())
    }
    
    function handleCheckoutClick(cartProducts) {
        console.log(cartProducts)
    }


    return (
        <Box bgcolor='secondary.main' mt={6} m={5} p={5} className={classes.root}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="customized table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.title} >Product</TableCell>
                            <TableCell align="center" className={classes.title} >Quantity</TableCell>
                            <TableCell align="center" className={classes.title} >Unit price</TableCell>
                            <TableCell align="center" className={classes.title} >Total price</TableCell>
                            <TableCell align="center" className={classes.title} >Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {cartProducts && cartProducts.map((product) => (
                        <TableRow key={product.name}>
                            <TableCell align="center">
                                <Box display='flex' justifyContent="flex-start" alignItems="center" >
                                    <Avatar src={product.Images[0].url}/>
                                    <Typography className={classes.productName} display='inline' variant="h6" color="initial">{product.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size='small'
                                    value={product.quantity}
                                    onChange={e => handleQuantityChange(product, e)}
                                    className={classes.quantityInput}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        inputProps: { 
                                            max: 99, min: 1
                                        }
                                    }}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="center">${product.price} EA</TableCell>
                            <TableCell align="center">${(product.price * product.quantity).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <IconButton variant='contained' color='primary' aria-label="delete" onClick={e => handleDelete(product)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider className={classes.divider} />

            <Box display='flex' flexDirection='column' justifyContent="space-around" alignItems="center" >
                <Typography variant="h3" color="secondary.dark" className={classes.subtotal}> {`Subtotal: $${subtotal}`}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LocalMall />}
                    className={classes.checkout}
                    onClick={e => handleCheckoutClick(cartProducts)}
                >
                    checkout
                </Button>
            </Box>

        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.shape.borderRadius,
    },
    head: {
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: theme.palette.secondary.main,
    },
    tableContainer: {
        marginBottom: 15,
    },
    productName: {
        marginLeft: 15,
    },
    divider: {
        color: theme.palette.secondary.dark,
    },
    quantityInput: {
        width: 75,
        borderRadius: 5,
        backgroundColor: theme.palette.common.white,
      },
      subtotal: {
        margin: 25,
    },
      checkout: {
        margin: 5,
    },
}));