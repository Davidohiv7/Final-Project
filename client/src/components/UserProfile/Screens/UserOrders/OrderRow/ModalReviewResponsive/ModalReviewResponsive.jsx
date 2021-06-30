import React, { useState } from 'react';
//Material UI imports
import { Backdrop, Dialog, DialogTitle, List, ListItem, ListItemText, Box, Typography, Button, Modal, Fade, Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import useStyles from './styles';
import { RateReview } from '@material-ui/icons';
//Components imports
import OrderProductReview from '../OrderProductReview/OrderProductReview'

export default function ModalReviewResponsive(props) {
    const { onClose, productsData, open, order, setProductsData } = props;
    const classes = useStyles();

    const [modalProduct, setModalProduct] = useState({});
    const [productReviewModalState, setProductReviewModalState] = useState(false);

    const handleClose = () => {
        onClose();
    };

    function handleReview(productData) {
        setProductReviewModalState(true)
        setModalProduct(productData)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="review-products">How was your buy?</DialogTitle>
            <List>
                {productsData.map((d) => (
                    <ListItem key={d.product.id}>
                        <ListItemAvatar>
                            <Avatar src={d.product.Images[0].url} />
                        </ListItemAvatar>
                        <ListItemText primary={`${d.product.name.substr(0, 20)}...`} />
                            {
                            d.product.Reviews.length > 0 ?
                                <Box>
                                    <Typography color="initial">Reviewed</Typography>
                                </Box>
                                :
                                <Button
                                    size='small'
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<RateReview />}
                                    onClick={() => handleReview(d)}
                                    disabled={d.product.Reviews.length > 0}
                                >
                                    review
                                </Button>
                            }
                        <Divider />
                    </ListItem>
                ))}
            </List>

            <Modal
                aria-labelledby="Product details"
                aria-describedby="Product details"
                className={classes.modal}
                open={productReviewModalState}
                onClose={() => setProductReviewModalState(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={productReviewModalState}>
                    <Box>
                        <OrderProductReview productData={modalProduct} order={order} setProductsData={setProductsData} setProductReviewModalState={setProductReviewModalState} />
                    </Box>
                </Fade>
            </Modal>

        </Dialog>
    );
}