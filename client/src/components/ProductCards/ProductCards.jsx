import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
//Imports Material UI components:
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
//Imports Material UI icons:
import { FavoriteBorder, ShoppingCartOutlined, Star } from '@material-ui/icons';

//Custom functinos
import { createArrayFromNumber, addToCart, addToFavorites } from '../../assets/utils/productCardFunctions'

function ProductCards() {

    const classes = useStyles();
    let history = useHistory();

    const [scoreArray, setScoreArray] = useState([]);
    const [quantity, setQuantity] = useState(1);

    //Hardcoded product data
    const product = {
        id: '1234jhgABC',
        name: 'Pan',
        image: 'https://assets.bonappetit.com/photos/5f84743360f032defe1f5376/16:9/w_2560%2Cc_limit/Pullman-Loaf-Lede-new.jpg',
        score: 5,
        price: 5,
    }

    useEffect(() => {
        const newScoreArray = createArrayFromNumber(product.score)
        setScoreArray(newScoreArray)
    }, [])


    function toDetails() {
        history.push(`/product/${product.id}`)
    }

    return (
        <Card className={classes.body}>
            <IconButton 
                color="primary" 
                aria-label="upload picture" 
                component="span" 
                className={classes.favButton}
                onClick={() => addToFavorites(product)}
            >
                <FavoriteBorder/>
            </IconButton>
            <CardActionArea onClick={() => toDetails()}>
                <CardMedia
                    className={classes.image}
                    title={product.name}
                    image={product.image}
                />
                <CardContent className={classes.cardContent}>
                    <Typography align='center' variant="h6" color='secondary' >{product.name}</Typography>
                    <Box display="flex" justifyContent="center">
                        {
                            scoreArray.map(number => <Star key={number} color='secondary' />) 
                        }
                    </Box>
                    <Typography align ='center' variant='body1' color='secondary'>Price: ${product.price}.00</Typography>
                </CardContent>
            </CardActionArea>
            
            <Box>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartOutlined/>}
                        onClick={() => addToCart(product, quantity, setQuantity)}
                    >
                        add
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
                </Box>
            </Box>
        </Card>
    );
}

//Custom styles
const useStyles = makeStyles({
    body: {
      width: 220,
      height: 300,
      backgroundColor: '#CE1212',
      borderRadius: 15,
    },
    image: {
      height: 150,
    },
    cardContent: {
      padding: 8,
    },
    quantityInput: {
      width: 65,
      borderRadius: 5,
      backgroundColor: "white",
    },
    favButton: {
      position: 'absolute',
      zIndex: 2,
      transform: 'translate(170px, 0px);'
    }
  });



export default ProductCards;