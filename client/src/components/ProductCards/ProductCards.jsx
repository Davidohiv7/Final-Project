import React, { useEffect, useState } from 'react';

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
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop';
//Imports Material UI icons:
import { FavoriteBorder, ShoppingCartOutlined, Star } from '@material-ui/icons';

//Custom functions
import { createArrayFromNumber, addToFavorites } from '../../assets/utils/productCardFunctions'
//React components
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard'



export default function ProductCards({ product }) {

    const classes = useStyles();

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
                <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="span" 
                    className={classes.favButton}
                    onClick={() => addToFavorites(product)}
                >
                    <FavoriteBorder/>
                </IconButton>
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

//Custom styles
const useStyles = makeStyles((theme) => ({
    body: {
      boxShadow: '1px 1px 8px -1px rgba(0,0,0,0.6)',
      width: 220,
      height: 300,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
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
      backgroundColor: theme.palette.common.white,
    },
    favButton: {
      position: 'absolute',
      zIndex: 2,
      transform: 'translate(60px, 0px);'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }));