import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import useStyles from './styles'

//Imports Material UI components:
import { Card, CardMedia, CardActionArea, Typography, CardContent, Box, IconButton, Button, Modal, Fade, Backdrop, Snackbar } from '@material-ui/core/'
import { Alert } from '@material-ui/lab';
//Imports Material UI icons:
import { FavoriteBorder, ShoppingCartOutlined, Star, Favorite } from '@material-ui/icons';
//Custom functions
import { createArrayFromNumber } from '../../assets/utils/productCardFunctions'
//React components
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard'
//actions
import { addToFavorites } from '../../actions/favorites/favorites_actions';

export default function ProductCards({ product }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))
    const { favorites } = useSelector((state) => ({ ...state.wishlistReducer }))

    const [scoreArray, setScoreArray] = useState([]);
    const [modalState, setModalState] = useState(false);

    const [favSnackbar, setFavSnackbar] = useState(false);
    const [alreadyFavSnackbar, setAlreadyFavSnackbar] = useState(false);

    useEffect(() => {
        const newScoreArray = createArrayFromNumber(product.score)
        setScoreArray(newScoreArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleAddToFav() {
        if(!!favorites.find(p => p.id === product.id)) {
            return setAlreadyFavSnackbar(true)
        }
        dispatch(addToFavorites(product, user.email));
        setFavSnackbar(true);
    }

    return (
        <Box>
            <Card className={classes.body}>
                {
                logged ? 
                <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="span" 
                    className={classes.favButton}
                    onClick={() => handleAddToFav()}
                >
                    {!!favorites.find(p => p.id === product.id) ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
                :
                undefined 
                }
                
                <CardActionArea onClick={() => setModalState(true)}>
                    <CardMedia
                        className={classes.image}
                        title={product.name}
                        image={product.Images[0].url}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography align='left' variant="subtitle2" color='black' className={classes.name}>{product.name}</Typography>
                        <Box display="flex" justifyContent="center">
                            {
                                scoreArray.map(number => <Star key={number} className={classes.star} />) 
                            }
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <Typography align ='center' variant='body1' color='black'>${product.price}</Typography>
                        </Box>
                    </CardContent>

                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<ShoppingCartOutlined color='primary'/>}
                            onClick={() => setModalState(true)}
                        >
                            add to cart
                        </Button>
                    </Box>
                </CardActionArea>
                
            </Card>
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
                    <ProductDetailsCard scoreArray={scoreArray} product={product} setModalState={setModalState}></ProductDetailsCard>
                </Fade>
            </Modal>

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
        </Box>
    );
}

