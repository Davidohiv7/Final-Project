import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default function UserReview({ review }) {
  const classes = useStyles();

  
  return (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Score here!"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                User review
              </Typography>
              {" — User name"}
            </React.Fragment>
          }
        />
      </ListItem>
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
}));