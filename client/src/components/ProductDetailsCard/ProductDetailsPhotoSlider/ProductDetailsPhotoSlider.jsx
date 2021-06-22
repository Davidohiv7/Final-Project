import React from 'react';
import useStyles from './styles';

//Imports Material UI components:
import { Card, CardMedia } from '@material-ui/core'
//Imports Components:
import ImageWrapper from './ImageWrapper/ImageWrapper';
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
            <ul className={classes.images}>
                {product.Images.map((file) => (
                    <li className={classes.imageSlider} key={file.id}>
                        <ImageWrapper
                            file={file}
                        />
                    </li>
                ))}
            </ul>
        </Card>
    )
}