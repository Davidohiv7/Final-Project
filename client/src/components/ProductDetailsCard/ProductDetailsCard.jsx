import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
//Imports Material UI components:
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
//Imports Material UI icons:
import { Star, ShoppingCartOutlined, FavoriteBorder } from '@material-ui/icons';
//Custom functions
import { addToCart } from '../../assets/utils/productCardFunctions'

export default function ProductDetailsCard({ product, scoreArray }) {

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
                            <Typography variant="h3" color="initial">{product.name}</Typography>
                            <Typography variant="h5" color="initial" display='inline'>${product.price}.00 EA</Typography>
                            <Box display="flex" justifyContent="center" className={classes.scoreContainer}>
                                {
                                    scoreArray.map(number => <Star key={number} color='white' />) 
                                }
                            </Box>
                        </CardContent>

                            

                        <Button
                            variant="outlined"
                            color="initial"
                            startIcon={<ShoppingCartOutlined/>}
                            onClick={() => addToCart(product, quantity, setQuantity)}
                        >
                            add to cart
                        </Button>
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
                        <Button
                            variant="outlined"
                            color="initial"
                            startIcon={<FavoriteBorder/>}
                            onClick={() => addToCart(product, quantity, setQuantity)}
                        >
                            add to favourites
                        </Button>
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
        width: 120
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
    }));