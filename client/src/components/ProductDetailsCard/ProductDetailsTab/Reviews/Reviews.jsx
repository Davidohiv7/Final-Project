import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import UserReview from './UserReview';

//actions
import { getProductReviews } from '../../../../actions/home/home_actions'

export default function Review({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => ({ ...state.homeReducer }))

  // get all reviews with score and usernames 
  useEffect(() => {
    dispatch(getProductReviews({id: product.id}))
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