import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
//Imports Material UI components:
import { Snackbar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, TextField, IconButton, Divider, Button, Popover, Modal, Fade, Backdrop} from '@material-ui/core/'
import { Alert } from '@material-ui/lab';
//Material UI icons
import { Delete, LocalMall } from '@material-ui/icons/';
//Custom functions
import { readLocalStorageCart, modifyQuantity, deleteProductFromCart } from '../../assets/utils/cartFunctions'
//modules
import axios from 'axios';
//Components
import Checkout from '../../components/Checkout/Checkout';
//actions
import {getCheckoutTotal, setCheckoutSubtotal} from '../../actions/checkout/checkout_actions' 
import { changeCartQuantity, deleteCartProduct, clearCart} from '../../actions/cart/cart_actions' 





export default function Cart() {

    const classes = useStyles();

    const dispatch = useDispatch();

    const { payment } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { logged } = useSelector((state) => ({ ...state.authenticationReducer }))
    const { cart } = useSelector((state) => ({ ...state.cartReducer }))

    const [cartProducts, setCartProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [stockProblemProducts, setStockProblemProducts] = useState([]);

    const [cartDisabledSnackbar, setDisabledCartSnackbar] = useState(false);
    const [noProductsSnackbar, setNoProductsSnackbar] = useState(false);
    const [noLoggedSnackbar, setNoLoggedSnackbar] = useState(false);

    const [stockPopover, setStockPopover] = useState(false);
    const [stockPopoverAnchor, setStockPopoverAnchor] = useState(null);

    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        if(!logged) {
            return setCartProducts(readLocalStorageCart())
        }
        setCartProducts(cart)
    }, [])

    useEffect(() => {
        if(logged) {
            setCartProducts(cart)
        }

    }, [cart])

    useEffect(() => {
        if(!logged) {
            if(cartProducts && cartProducts.length > 0) {
                return setSubtotal(cartProducts.map(p => p.price * p.quantity).reduce((acc, v) => acc + v))
            }
            setSubtotal(0)
        }
    }, [cartProducts])

    useEffect(() => {
        if(logged) {
            if(cart && cart.length > 0) {
                //Este se puede romper en funcion de como llegue la info del back
                return setSubtotal(cart.map(p => p.price * p.quantity).reduce((acc, v) => acc + v))
            }
            setSubtotal(0)
        }
    }, [cart])

    function handleQuantityChange(product, e) {
        if(payment.state) {
            return setDisabledCartSnackbar(true)
        }
        if(!logged) {
            modifyQuantity(product, Number(e.target.value))
            return setCartProducts(readLocalStorageCart())
        }
        //AQUI VA LA PARTE DE CUANDO ESTE LOGGEADO DEBE SER UNA ACTION, CREAR LA ACTION
        dispatch(changeCartQuantity(product, Number(e.target.value)))
    }

    function handleDelete(product) {
        if(payment.state) {
            return setDisabledCartSnackbar(true)
        }
        if (!logged) {
            deleteProductFromCart(product)
            return setCartProducts(readLocalStorageCart())
        }
        dispatch(deleteCartProduct(product))
    }

    function handleClearCart(e) {
        if(payment.state) {
            return setDisabledCartSnackbar(true)
        }
        if(!logged) {
            const cart = localStorage.getItem('cart')
            if(cart) {
                setCartProducts([])
                return localStorage.removeItem('cart')
            } 
        }
        //AQUI VA LA PARTE DE CUANDO ESTE LOGGEADO DEBE SER UNA ACTION, CREAR LA ACTION
        dispatch(clearCart())
    }
    
    async function handleCheckoutClick(e, cartProducts) {
        if(logged) {
            if(cartProducts && cartProducts.length > 0) {
                const idArray = cartProducts.map(p => p.id);
                try {
                    const response = await axios.post("http://localhost:3001/products/stockbyid", { idArray });
                    const updateProductListStock = response.data.data.productList;
                    const lessStockProducts = []
                    cartProducts.forEach(p => {
                        const updateProduct = updateProductListStock.find(pu => pu.id === p.id);
                        if(updateProduct.stock < p.quantity) {
                            lessStockProducts.push(updateProduct)
                        }
                    })
                    if(lessStockProducts.length > 0) {
                        setStockProblemProducts(lessStockProducts)
                        setStockPopover(true)
                        console.log(e)
                        return setStockPopoverAnchor(e.target)
                    }
                    dispatch(getCheckoutTotal())
                    setModalState(true)
                }
                catch(error) {
                    console.log(error)
                }
            }else {
                setNoProductsSnackbar(true)
            } 
        }else{
            setNoLoggedSnackbar(true)
        }
        
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
                <Typography variant="h3" color="secondary.dark" className={classes.subtotal}> {`Subtotal: $${subtotal.toFixed(2)}`}</Typography>
                <Box display='flex' justifyContent="center" alignItems="center" >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LocalMall />}
                        className={classes.checkout}
                        onClick={e => handleCheckoutClick(e, cartProducts)}
                    >
                        checkout
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Delete />}
                        className={classes.checkout}
                        onClick={e => handleClearCart(e)}
                    >
                        clear cart
                    </Button>
                </Box>
                
                <Popover
                    open={stockPopover}
                    anchorEl={stockPopoverAnchor}
                    onClose={() => setStockPopover(false)}
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
                        <Typography>Sorry, we don't have enough stock of the following items</Typography>
                        {
                            stockProblemProducts.map(p => {
                                return <Typography>- {p.name}, Actual stock: {p.stock}</Typography>
                            })
                        }
                    </Box>
                </Popover>
            </Box>

            <Snackbar open={cartDisabledSnackbar} autoHideDuration={3000} onClose={() => setDisabledCartSnackbar(false)} variant="filled">
                <Alert onClose={() => setDisabledCartSnackbar(false)} severity="error">
                    Please confirm yor active paid order, before modify the cart
                </Alert>
            </Snackbar>

            <Snackbar open={noProductsSnackbar} autoHideDuration={3000} onClose={() => setNoProductsSnackbar(false)} variant="filled">
                <Alert onClose={() => setNoProductsSnackbar(false)} severity="error">
                    Please add products before the checkout
                </Alert>
            </Snackbar>

            <Snackbar open={noLoggedSnackbar} autoHideDuration={3000} onClose={() => setNoLoggedSnackbar(false)} variant="filled">
                <Alert onClose={() => setNoLoggedSnackbar(false)} severity="error">
                    Please log in to your account or create a new one to continue to the checkout
                </Alert>
            </Snackbar>
            
            <Modal
                aria-labelledby="Product details"
                aria-describedby="Product details"
                className={classes.modal}
                open={modalState}
                onClose={() => setModalState(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalState}>
                    <Checkout subtotal={subtotal.toFixed(2)} />
                </Fade>
            </Modal>
            
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));