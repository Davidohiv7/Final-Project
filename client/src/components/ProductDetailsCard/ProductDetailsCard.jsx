import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
//Import components
import ProductDetailsTab from './ProductDetailsTab/ProductDetailsTab.jsx'
import ProductDetailsPhotoSlider from './ProductDetailsPhotoSlider/ProductDetailsPhotoSlider.jsx'
//Imports Material UI components:
import {Paper, Card, CardMedia, CardContent, Box, Typography, TextField, Button, IconButton, Divider, Snackbar} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
//Imports Material UI icons:
import { Star, ShoppingCartOutlined, FavoriteBorder, Close, CodeOutlined } from '@material-ui/icons';
//Custom functions
import { addToCart, addToFavorites } from '../../assets/utils/productCardFunctions'
//actions
import { addProductToCart, setLocalCart } from '../../actions/cart/cart_actions'



export default function ProductDetailsCard({ product, scoreArray, setModalState }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { payment } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { logged } = useSelector((state) => ({ ...state.authenticationReducer }))
    const { cart } = useSelector((state) => ({ ...state.cartReducer }))

    const [quantity, setQuantity] = useState(1);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [cartSnackbar, setCartSnackbar] = useState(false);
    const [noMoreStockSnackBar, setNoMoreStockSnackBar] = useState(false);
    const [cartDisabledSnackbar, setDisabledCartSnackbar] = useState(false);
    const [favSnackbar, setFavSnackbar] = useState(false);
    const [alreadyFavSnackbar, setAlreadyFavSnackbar] = useState(false);

    useEffect(() => {
        const validateCartProduct = cart.find(p => p.id === product.id);
        console.log(cart)
        if(validateCartProduct) {
            setQuantityInCart(validateCartProduct.quantity)
        }
      }, [])

    useEffect(() => {
        const validateCartProduct = cart.find(p => p.id === product.id);
        console.log(cart)
        if(validateCartProduct) {
            setQuantityInCart(validateCartProduct.quantity)
        }
    }, [cart])

    function handleAddToCart(product, quantity, setQuantity) {
        if(payment.state) {
            return setDisabledCartSnackbar(true)
        }
        if(quantityInCart === product.stock) {
            return setNoMoreStockSnackBar(true)
        }
        if(!logged) {
            addToCart(product, quantity, setQuantity)
            dispatch(setLocalCart())
            return setCartSnackbar(true)
        }
        dispatch(addProductToCart(product, quantity))
        setQuantity(1)
        setCartSnackbar(true)
    }

    async function handleAddToFavs(product) {
        const addedToFav = addToFavorites(product)
        if(addedToFav) return setFavSnackbar(true)
        return setAlreadyFavSnackbar(true)
    }

    return (
        <Paper className={classes.root} elevation={24} variant='elevation' >
            <Box className={classes.container} display="flex" flexDirection='row' justifyContent="center" alignItems="center" >
                <Box className={classes.section}>
                    <ProductDetailsPhotoSlider product={product} />
                </Box>
                <Box className={classes.section}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.name} gutterBottom={false} variant="h6" color="initial">{product.name}</Typography>
                            <Box display="flex" flexDirection='row' justifyContent="flex-start" alignItems="center">
                                <Typography variant="h5" color="initial" display='inline'>${product.price} EA</Typography>
                                <Box display="flex" justifyContent="center" className={classes.scoreContainer}>
                                    {
                                        scoreArray.map(number => <Star key={number} color='white' />) 
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                        
                        <Divider/>

                        <ProductDetailsTab product={product}/>
                        
                        <Divider/>
                        <CardContent>
                            <Box display="flex" flexDirection='row' justifyContent="center" alignItems="center" >
                                <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" >
                                    <Button
                                        className={classes.favButton}
                                        variant="outlined"
                                        color="initial"
                                        startIcon={<FavoriteBorder/>}
                                        onClick={() => handleAddToFavs(product)}
                                    >
                                        favourites
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="initial"
                                        startIcon={<ShoppingCartOutlined/>}
                                        onClick={() => handleAddToCart(product, quantity, setQuantity)}
                                    >
                                        add to cart
                                    </Button>
                                </Box>
                                <Box className={classes.cartTotal} display="flex" flexDirection='column-reverse' justifyContent="center" alignItems="center" >
                                    <TextField
                                        size='small'
                                        value={quantityInCart === product.stock ? 0 : quantity}
                                        onChange={e => {
                                            if(Number(e.target.value) === 0){
                                                return setQuantity(1)
                                            }
                                            if(Number(e.target.value) > (product.stock - quantityInCart)) {
                                                return setQuantity(product.stock - quantityInCart)
                                            }
                                            setQuantity(Number(e.target.value))
                                        }}
                                        className={classes.quantityInput}
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: { 
                                                max: (product.stock - quantityInCart), 
                                                min: 1
                                            }
                                        }}
                                        variant="outlined"
                                    />
                                    <Typography variant="h5" color="initial" display='inline'>${(product.price*quantity).toFixed(2)} EA</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        
                        <IconButton 
                            color="initial" 
                            aria-label="close" 
                            component="span" 
                            className={classes.closeButton}
                            onClick={() => setModalState(false)}
                        >
                            <Close/>
                        </IconButton>
                    </Card>
                </Box>
            </Box>
            
            <Snackbar open={cartSnackbar} autoHideDuration={3000} onClose={() => setCartSnackbar(false)} variant="filled">
                <Alert onClose={() => setCartSnackbar(false)} severity="success">
                    The product was successfully added to the cart!
                </Alert>
            </Snackbar>

            <Snackbar open={noMoreStockSnackBar} autoHideDuration={3000} onClose={() => setNoMoreStockSnackBar(false)} variant="filled">
                <Alert onClose={() => setNoMoreStockSnackBar(false)} severity="error">
                    You already have all our avaible stock in your cart, we'll have more soon.
                </Alert>
            </Snackbar>

            <Snackbar open={cartDisabledSnackbar} autoHideDuration={3000} onClose={() => setDisabledCartSnackbar(false)} variant="filled">
                <Alert onClose={() => setDisabledCartSnackbar(false)} severity="error">
                    Please confirm yor active paid order, before add a new product to the cart
                </Alert>
            </Snackbar>

            <Snackbar open={favSnackbar} autoHideDuration={3000} onClose={() => setFavSnackbar(false)} variant="filled">
                <Alert onClose={() => setFavSnackbar(false)} severity="success">
                    The product was successfully added to favourites!
                </Alert>
            </Snackbar>

            <Snackbar open={alreadyFavSnackbar} autoHideDuration={3000} onClose={() => setAlreadyFavSnackbar(false)} variant="filled">
                <Alert onClose={() => setAlreadyFavSnackbar(false)} severity="info">
                    The product is already in favourites!
                </Alert>
            </Snackbar>

        </Paper>             
    )
}


//Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
      width: 750,
      height: 500,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: theme.shape.borderRadius,
    },
    container: {
        height: '100%',
      },
    section: {
        height: '100%',
        width: '100%'
    },
    scoreContainer: {
        width: 120,
        marginBottom: 6,
        marginLeft: 65
    },
    card: {
        height: '100%',
    },
    name: {
        marginRight: 17,
    },
    quantityInput: {
        width: 80,
        borderRadius: 5,
        backgroundColor: theme.palette.common.white,
      },
    closeButton: {
        position: 'absolute',
        zIndex: 5,
        transform: 'translate(330px, -500px);'
      },
    cartTotal: {
        marginLeft: 25,
      },
    favButton: {
        width: 155,
      },
    }));