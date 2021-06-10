import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
//Import components
import ProductDetailsTab from './ProductDetailsTab/ProductDetailsTab.jsx'
//Imports Material UI components:
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
//Imports Material UI icons:
import { Star, ShoppingCartOutlined, FavoriteBorder, Close } from '@material-ui/icons';
//Custom functions
import { addToCart, addToFavorites } from '../../assets/utils/productCardFunctions'

export default function ProductDetailsCard({ product, scoreArray, setModalState }) {

    const classes = useStyles();

    const [quantity, setQuantity] = useState(1);

    return (
        <Paper className={classes.root} elevation={24} variant='elevation' >
            <Box className={classes.container} display="flex" flexDirection='row' justifyContent="center" alignItems="center" >
                <Box className={classes.section}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.image}
                            title={product.name}
                            image={product.image}
                        />
                    </Card>
                </Box>
                <Box className={classes.section}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography gutterBottom={false} variant="h3" color="initial">{product.name}</Typography>
                            <Box display="flex" flexDirection='row' justifyContent="flex-start" alignItems="center">
                                <Typography variant="h5" color="initial" display='inline'>${product.price}.00 EA</Typography>
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
                                        onClick={() => addToFavorites(product)}
                                    >
                                        favourites
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="initial"
                                        startIcon={<ShoppingCartOutlined/>}
                                        onClick={() => addToCart(product, quantity, setQuantity)}
                                    >
                                        add to cart
                                    </Button>
                                </Box>
                                <Box className={classes.cartTotal} display="flex" flexDirection='column-reverse' justifyContent="center" alignItems="center" >
                                    <TextField
                                        size='small'
                                        value={quantity}
                                        onChange={e => setQuantity(Number(e.target.value))}
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
                                    <Typography variant="h5" color="initial" display='inline'>${product.price*quantity}.00 EA</Typography>
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
    image: {
        height: '100%',
    },
    quantityInput: {
        width: 65,
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
      }
    }));