import React from 'react';
import useStyles from './styles';

//Imports Material UI components:
import { Card, CardMedia } from '@material-ui/core'
//Imports Material UI icons:
//import { Star, ShoppingCartOutlined, FavoriteBorder, Close, CodeOutlined } from '@material-ui/icons';

export default function ProductDetailsPhotoSlider({ product }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                title={product.name}
                image={product.Images[0].url}
            />
        </Card>
    )
}