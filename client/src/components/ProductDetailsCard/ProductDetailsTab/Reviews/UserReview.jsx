import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, Divider, ListItemText, Typography } from '@material-ui/core/';

export default function UserReview({ review }) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemText
        primary={`Score: ${review.score}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${review.Person.name} ${review.Person.lastName}: `}
              </Typography>
              {review.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" className={classes.divider} />
    </React.Fragment>
  );
}

// Styles 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  divider: {
    width: '100%',
  },
}));