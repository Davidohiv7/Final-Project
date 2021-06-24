import React, {useEffect, useState} from 'react';
import { Typography, List } from '@material-ui/core';
import useStyles from "./styles";
import UserReview from './UserReview/UserReview';
import axios from 'axios';


export default function Review({ product }) {

  const classes = useStyles();

  const [reviews, setReviews] = useState([]);
  /* eslint-disable */
  useEffect(() => {
    const functionGetReviews = async() => {
      try {
        const response = await axios.get("http://localhost:3001/reviews/getById", { params: { id: product.id } });
        const reviewsOnProd = response.data.data;
        setReviews(reviewsOnProd);
      } catch (error) {
        console.log(error);
      }
    }
    functionGetReviews();
  }, []);
  /* eslint-enable */
  return (
    <List className={classes.root}>
      {reviews.length > 0 ? reviews.map((review) => (
        <UserReview   review={review} />
      ))
    :
    <Typography className={classes.notFound} color='primary'>There are no reviews for this product</Typography>
    }
    </List>
  );
}
