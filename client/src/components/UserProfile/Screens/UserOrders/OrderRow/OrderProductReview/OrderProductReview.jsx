//react imports
import React, {useState} from "react";
// Material UI imports
import {Box, Typography, Avatar, TextField, Button } from "@material-ui/core";
//Styles
import useStyles from "./styles";
//Materia UI icons
import { Check } from '@material-ui/icons';


export default function OrderProductReview( { productData }) {

    const classes = useStyles();

    const [review, setReview] = useState({
        score: 0,
        review: ''
    });

    const handleInputChange = function(e) {
        setReview({
            ...review,
            [e.target.name]: e.target.value
            });
    }

    function handleSubmit(e) {
        console.log('Submit')
    }


    return (
        <Box p={2} display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' className={classes.container}>
            <Typography className={classes.title} variant="h5" color="primary">Please write a review of:</Typography>
            <Box display='flex' alignItems='center' justifyContent='center'>
                <Avatar src={productData.product.Images[0].url} className={classes.image}/>
                <Typography variant="body1" color="initial" className={classes.name}>{productData.product.name}</Typography>
            </Box>
            <Typography variant="h6" color="initial">Score</Typography>
            <TextField
                id="review"
                label="Review description"
                name="review"
                variant="outlined"
                multiline
                rows={5}
                value={review.review}
                onChange={handleInputChange}
                className={classes.input}
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
        </Box>
    )
}