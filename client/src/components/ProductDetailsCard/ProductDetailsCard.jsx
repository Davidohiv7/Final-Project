import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import useStyles from './styles';
//Import components
import ProductDetailsTab from './ProductDetailsTab/ProductDetailsTab.jsx';
import ProductDetailsPhotoSlider from './ProductDetailsPhotoSlider/ProductDetailsPhotoSlider.jsx';
//Imports Material UI components:
import {Grid, Paper, Card, CardContent, Box, Typography, TextField, Button, IconButton, Divider, Snackbar} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
//Imports Material UI icons:
import { Star, ShoppingCartOutlined, FavoriteBorder, Close } from '@material-ui/icons';
//Custom functions
import { addToCart } from '../../assets/utils/productCardFunctions';
//actions
import { addProductToCart, setLocalCart } from '../../actions/cart/cart_actions';
import { addToFavorites, getFavorites } from '../../actions/favorites/favorites_actions';



export default function ProductDetailsCard({ product, scoreArray, setModalState }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { payment } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))
    const { cart } = useSelector((state) => ({ ...state.cartReducer }))
    const { favorites } = useSelector((state) => ({ ...state.wishlistReducer }))

    const [quantity, setQuantity] = useState(1);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [cartSnackbar, setCartSnackbar] = useState(false);
    const [noMoreStockSnackBar, setNoMoreStockSnackBar] = useState(false);
    const [cartDisabledSnackbar, setDisabledCartSnackbar] = useState(false);
    const [favSnackbar, setFavSnackbar] = useState(false);
    const [alreadyFavSnackbar, setAlreadyFavSnackbar] = useState(false);
    /* eslint-disable */
    useEffect(() => {
        const validateCartProduct = cart.find(p => p.id === product.id);
        if(validateCartProduct) {
            setQuantityInCart(validateCartProduct.quantity)
        }
      }, [])

    useEffect(() => {
        const validateCartProduct = cart.find(p => p.id === product.id);
        if(validateCartProduct) {
            setQuantityInCart(validateCartProduct.quantity)
        }
    }, [cart])

    useEffect(() => {
        if(user) {
            dispatch(getFavorites(user.email));
        }
    }, [])
    /* eslint-enable */

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
        if(!!favorites.find(p => p.id === product.id)) {
            return setAlreadyFavSnackbar(true)
        }
        dispatch(addToFavorites(product, user.email));
        setFavSnackbar(true);
    }

    return (
        <Grid container justify='center' >
            <Paper className={classes.root} align='center' elevation={24} variant='elevation' >
                <Grid className={classes.container} justifyContent="center" alignItems="center" >
                    <Grid className={classes.section}  >
                        <ProductDetailsPhotoSlider product={product} />
                    </Grid>
                    <Grid className={classes.section}  >
                        <Card className={classes.card}>
                            <CardContent>
                                <Box className={classes.container} display="flex" justifyContent="space-between" alignItems="flex-start">
                                    <Typography className={classes.name} gutterBottom={false} variant="h6" color="initial">{product.name}</Typography>
                                    <IconButton 
                                        color="initial" 
                                        aria-label="close" 
                                        component="span" 
                                        className={classes.closeButton}
                                        onClick={() => setModalState(false)}
                                    >
                                        <Close/>
                                    </IconButton>
                                </Box>
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
                            <CardContent className={classes.bttn_container}>
                                <Box display="flex" flexDirection='row' justifyContent="center" alignItems="center" mt={1}>
                                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" >
                                        <Button
                                            className={logged ? classes.favButton : classes.favButtonNot}
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
                                        <Typography className={classes.total} variant="h5" color="initial" display='inline'>${(product.price*quantity).toFixed(2)} EA</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper> 

          {/* --------------------   MODAL RESPONSIVE!! -----------------------  */}
            <Grid className={classes.responsive_modal}>
                <Grid className={classes.section}  >
                   <ProductDetailsPhotoSlider product={product} />
                </Grid>
                <Grid className={classes.responsive_content}>
                    <Card className={classes.card}>
                            <CardContent className={classes.cardcontent}>
                                <Box className={classes.container} display="flex" justifyContent="center" alignItems="flex-start">
                                    <Typography className={classes.name} gutterBottom={false} variant="subtitle1" color="initial">{product.name}</Typography>
                                    <IconButton 
                                        color="initial" 
                                        aria-label="close" 
                                        component="span" 
                                        className={classes.closeButton}
                                        onClick={() => setModalState(false)}
                                    >
                                        <Close/>
                                    </IconButton>
                                </Box>
                                <Box display="flex" flexDirection='row' justifyContent="flex-start" alignItems="center">
                                    <Typography variant="subtitle5" color="initial" display='inline'>${product.price} EA</Typography>
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
                            <CardContent className={classes.bttn_container}>
                                <Box  display="flex" flexDirection='row' justifyContent="center" alignItems="center" >
                                    <Box display="flex" flexDirection='row' justifyContent="center" alignItems="center" >
                                        <Button
                                            className={classes.favButton}
                                            variant="outlined"
                                            color="initial"
                                            startIcon={<FavoriteBorder/>}
                                            onClick={() => handleAddToFavs(product)}
                                        >
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            className={classes.favButton}
                                            color="initial"
                                            startIcon={<ShoppingCartOutlined/>}
                                            onClick={() => handleAddToCart(product, quantity, setQuantity)}
                                        >
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
                                        <Typography variant="subtitle5" color="initial" display='inline'>${(product.price*quantity).toFixed(2)} EA</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>
          {/*-------------------  xxxxxxxxxxxxxxxxxxxx --------------------------*/}  

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
        </Grid>           
    )
}

