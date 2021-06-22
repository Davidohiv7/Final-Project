//react imports
import React, { useState }from "react";
// Material UI imports
import {Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, Button, Modal, Backdrop, Fade} from "@material-ui/core";
//Material UI icons
import { RateReview } from '@material-ui/icons'
//Styles
import useStyles from "./styles";
//Components
import ProductDetailsCard from '../../../../../ProductDetailsCard/ProductDetailsCard'
//Custom functions
import { createArrayFromNumber } from '../../../../../../assets/utils/productCardFunctions'


export default function OrderDetails( { productsData }) {

    const classes = useStyles();

    const [modalProduct, setModalProduct] = useState({});
    const [modalState, setModalState] = useState(false);

    function handleProductDetail(e, d) {
        setModalProduct(d.product)
        setModalState(true)
    }

    function handleReview() {
        console.log('Boton review')
    }

    return (
        <Box p={1} display='flex' alignItems='flex-start' justifyContent='center'>
            <Box p={1} width='100%'>
                <Typography variant="h6" color="initial">Order products:</Typography>
                <List className={classes.list}>
                    
                    {
                    productsData?.map(d => 
                        <ListItem divider onClick={e => handleProductDetail(e, d)} button>
                            <ListItemAvatar>
                                <Avatar src={d.product.Images[0].url}/>
                            </ListItemAvatar>
                            <ListItemText primary={d.product.name} secondary={`Quantity x ${d.orderProductData.quantity} - Subotal: ${d.orderProductData.subtotal}`}/>

                            <ListItemSecondaryAction>
                                <Button
                                    size='small'
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<RateReview/>}
                                    onClick={() => handleReview()}
                                >
                                    review
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                        )
                    }


                </List>
            </Box>

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
                    <ProductDetailsCard scoreArray={createArrayFromNumber(modalProduct.score)} product={modalProduct} setModalState={setModalState}></ProductDetailsCard>
                </Fade>
            </Modal>
            
        </Box>
    )
}