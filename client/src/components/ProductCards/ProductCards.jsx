import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import useStyles from './styles'

//Imports Material UI components:
import { Card, CardMedia, CardActionArea, Typography, CardContent, Box, IconButton, Button, Modal, Fade, Backdrop } from '@material-ui/core/'
//Imports Material UI icons:
import { FavoriteBorder, ShoppingCartOutlined, Star } from '@material-ui/icons';

//Custom functions
import { createArrayFromNumber } from '../../assets/utils/productCardFunctions'
//React components
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard'
//actions
import { addToFavorites } from '../../actions/favorites/favorites_actions';

export default function ProductCards({ product }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => ({ ...state.authenticationReducer }))


    const [scoreArray, setScoreArray] = useState([]);
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        const newScoreArray = createArrayFromNumber(product.score)
        setScoreArray(newScoreArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            <Card className={classes.body}>
                {
                user ? 
                <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="span" 
                    className={classes.favButton}
                    onClick={() => dispatch(addToFavorites(product, user.email))}
                >
                    <FavoriteBorder/>
                </IconButton>
                :
                <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="span" 
                    className={classes.favButton}
                >
                    <FavoriteBorder/>
                </IconButton>
                    
                }
                
                <CardActionArea onClick={() => setModalState(true)}>
                    <CardMedia
                        className={classes.image}
                        title={product.name}
                        image={product.Images[0].url}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography align='center' variant="p" color='secondary' >{product.name}</Typography>
                        <Box display="flex" justifyContent="center">
                            {
                                scoreArray.map(number => <Star key={number} color='secondary' />) 
                            }
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <Typography align ='center' variant='body1' color='secondary'>${product.price} EA</Typography>
                        </Box>
                    </CardContent>

                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ShoppingCartOutlined/>}
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
        </Box>
        
    );
}

