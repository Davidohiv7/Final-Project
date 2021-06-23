import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import UserReview from './UserReview';
import axios from 'axios';

//actions
//import { getProductReviews } from '../../../../actions/home/home_actions'

export default function Review({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const { reviews } = useSelector((state) => ({ ...state.homeReducer }))
  const [reviews, setReviews] = useState([]);

  // get all reviews with score and usernames 
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
    //dispatch(getProductReviews({id: product.id}))
  }, []);

  return (
    <List className={classes.root} subheader={<li />}>
      {reviews ? reviews.map((review) => (
        <UserReview   review={review} />
      ))
    :
    <Typography className={classes.notFound} color='primary'>There is no reviews for this product</Typography>
    }
    </List>
  );
}

// Styles

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 175,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    notFound: {
        textAlign: 'center',
    }
  }));