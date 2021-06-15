import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Imports Material UI components:
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, TextField, IconButton, Divider, Button, Popover, Modal, Fade, Backdrop} from '@material-ui/core/'
//Material UI icons
import { Delete, LocalMall } from '@material-ui/icons/';
//Custom functions
import { readLocalStorageCart, modifyQuantity, deleteProductFromCart } from '../../assets/utils/cartFunctions'
//modules
import axios from 'axios';
//Components
import Checkout from '../../components/Checkout/Checkout';





export default function Cart() {

    const classes = useStyles();
    const [cartProducts, setCartProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [stockProblemProducts, setStockProblemProducts] = useState([]);

    const [stockPopover, setStockPopover] = useState(false);
    const [stockPopoverAnchor, setStockPopoverAnchor] = useState(null);

    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        setCartProducts(readLocalStorageCart())
    }, [])

    useEffect(() => {
        if(cartProducts && cartProducts.length > 0) {
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
    
    async function handleCheckoutClick(e, cartProducts) {
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
            setModalState(true)
        }
        catch(error) {
            console.log(error)
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
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LocalMall />}
                    className={classes.checkout}
                    onClick={e => handleCheckoutClick(e, cartProducts)}
                >
                    checkout
                </Button>
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
                    <Checkout/>
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