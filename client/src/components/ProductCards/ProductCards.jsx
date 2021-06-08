import React, { useEffect, useState } from 'react';
import useStyles from './ProductsCardsStyles'
import { Card, CardMedia, Typography, CardContent, Box, Button } from '@material-ui/core';
import {FavoriteBorderIcon, ShoppingCartOutlinedIcon, StarIcon} from '@material-ui/icons';


function ProductCards() {

    const classes = useStyles();

    const [scoreArray, setScoreArray] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const productExample = {
        name: 'Pansito',
        image: 'https://assets.bonappetit.com/photos/5f84743360f032defe1f5376/16:9/w_2560%2Cc_limit/Pullman-Loaf-Lede-new.jpg',
        score: 5,
        price: 5,
    }

    function createArrayFromNumber(number) {
        const arrayOfNumbers = []
            for (let i = 1; i <= number; i++) {
                arrayOfNumbers.push(i);
            }
        return arrayOfNumbers     
    }

    useEffect(() => {
        const newScoreArray = createArrayFromNumber(productExample.score)
        setScoreArray(newScoreArray)
    })

    return (
        <Card className={classes.body}>
            <CardMedia
                className={classes.image}
                title={productExample.name}
                image={productExample.image}
            />
            <CardContent>
                <Typography align='center' variant="h6" color='secondary' >{productExample.name}</Typography>
                <Box display="flex" justifyContent="center">
                    {
                        scoreArray.map(() => <StarIcon color='secondary' />) 
                    }
                </Box>
                <Typography align ='center' variant='body1' color='secondary'>Price: ${productExample.price}.00</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    Save
                  </Button>

                 <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartOutlinedIcon />}
                  >
                    Save
                  </Button>

                  <TextField
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                        />

            </CardContent>
        </Card>
    );
}

export default ProductCards;