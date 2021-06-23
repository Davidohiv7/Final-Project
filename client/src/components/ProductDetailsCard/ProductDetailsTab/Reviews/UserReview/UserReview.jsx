import React from 'react';
import useStyles from "./styles";
import { ListItem, Divider, ListItemText, Typography } from '@material-ui/core/';

export default function UserReview({ review }) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <ListItem className={classes.root} alignItems="flex-start">
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
