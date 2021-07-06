//react imports
import React, {useState} from "react";
import { useDispatch } from 'react-redux';
// Material UI imports
import {Box, Typography, Avatar, TextField, Button, IconButton, Popover } from "@material-ui/core";
//Styles
import useStyles from "./styles";
//Materia UI icons
import { Check, Star, StarBorder} from '@material-ui/icons';
//Custom functions
import { createArrayFromNumber } from '../../../../../../assets/utils/productCardFunctions'
import { reviewValidation } from '../../../../../../assets/utils/reviews'
//axios
import axios from 'axios'
//actions
import { getAllProducts } from '../../../../../../actions/home/home_actions';

export default function OrderProductReview( { productData,  order, setProductsData, setProductReviewModalState }) {

    const apiURL = process.env.REACT_APP_API_URL

    const classes = useStyles();

    const dispatch = useDispatch();

    const scoreArray = createArrayFromNumber(5)

    const [review, setReview] = useState({
        score: 0,
        description: ''
    });

    const [errorsArray, setErrorsArray] = useState([]);
    const [errorsPopover, setErrorsPopover] = useState(false);
    const [errorsPopoverAnchor, setErrorsPopoverAnchor] = useState(null);

    const handleInputChange = function(e) {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        });
    }

    function handleStarClick(value) {
        setReview({
            ...review,
            score: value
        });
    }

    async function handleSubmit(e) {

        const reviewErrors = reviewValidation(review)

        if(Object.keys(reviewErrors).length === 0) {
            const requestData = {
                orderId: order.id,
                productId: productData.product.id,
                review
            }
            const jwt = localStorage.getItem('jwt')
            const response = await axios.post(apiURL + "/reviews/add", {...requestData }, { headers: { 'Authorization': jwt }} )
            const data = response.data.data
            if(data.isNew) {
                const responseUpdate = await axios.post(apiURL + "/orders/products", { order }, { headers: { 'Authorization': jwt }} )
                const orderDetailedData = responseUpdate.data.data.orderData
                orderDetailedData && setProductsData(orderDetailedData)
                dispatch(getAllProducts())
                setProductReviewModalState(false)
            }
        }
        setErrorsArray(Object.values(reviewErrors).reduce((acc, v) => [...acc, ...v], []))
        setErrorsPopover(true)
        return setErrorsPopoverAnchor(e.currentTarget)
    }


    return (
        <Box p={2} display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' className={classes.container}>
            <Typography className={classes.title} variant="h5" color="primary">Please review our product: </Typography>
            <Box display='flex' alignItems='center' justifyContent='center'>
                <Avatar src={productData.product.Images[0].url} className={classes.image}/>
                <Typography variant="body1" color="initial" className={classes.name}>{productData.product.name}</Typography>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='center'>
                {
                    scoreArray.map(value => {
                        if(value <= review.score) {
                            return (
                            <IconButton onClick={() => handleStarClick(value)} color="primary">
                                <Star/>
                            </IconButton>
                            )
                        }
                        return (
                            <IconButton onClick={() => handleStarClick(value)} color="primary">
                                <StarBorder/>
                            </IconButton>
                            )
                    })
                }
            </Box>
            <TextField
                id="review"
                label="Review description"
                name="description"
                variant="outlined"
                placeholder='Tell us your impression of the product, max 150 characters'
                multiline
                rows={4}
                value={review.description}
                onChange={handleInputChange}
                className={classes.input}
                inputProps={{ maxLength: 150 }}
            />
            <Button
                size='small'
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Check/>}
                onClick={e => handleSubmit(e)}
            >
                submit
            </Button>

            <Popover
                open={errorsPopover}
                anchorEl={errorsPopoverAnchor}
                onClose={() => setErrorsPopover(false)}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >

                <Box p={2}>
                    {
                        errorsArray && errorsArray.map(e => {
                            return <Typography>- {e}</Typography>
                        })
                    }
                </Box>
                
            </Popover>
        </Box>
    )
}