import React, { useEffect, useState } from 'react';
import useStyles from './ProductsCardsStyles'
import { Card, CardMedia, Typography, CardContent, Box } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

function ProductCards() {

    const classes = useStyles();

    const [scoreArray, setScoreArray] = useState([]);

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
                        scoreArray.map(() => <StarIcon color='inherit' />) 
                    }
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductCards;