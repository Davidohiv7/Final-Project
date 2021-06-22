import React, { useState } from 'react';
import useStyles from './styles';

//Imports Material UI components:
import { Card, CardMedia, CardActionArea } from '@material-ui/core'
//Imports Components:
import ImageWrapper from './ImageWrapper/ImageWrapper';
//import { Star, ShoppingCartOutlined, FavoriteBorder, Close, CodeOutlined } from '@material-ui/icons';

export default function ProductDetailsPhotoSlider({ product }) {
    const classes = useStyles();
    const [displayedImage, setDisplayedImage] = useState(product.Images[0].url)


    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                title={product.name}
                image={displayedImage}
            />
            <ul>
                {product.Images.map((file) => (
                    <CardActionArea onClick={() => setDisplayedImage(file.url)} className={classes.images}>
                        <li className={classes.imageSlider} key={file.id}>
                            <ImageWrapper
                                file={file}
                            />
                        </li>
                    </CardActionArea>
                ))}
            </ul>
        </Card>
    )
}