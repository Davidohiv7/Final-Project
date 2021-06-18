import React from 'react';

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from'react-redux';

import { addUrlToDelete } from '../../../../../actions/admin/admin_actions';


const useStyles = makeStyles((theme) => ({
  delete: {
    backgroundColor: '#D22727',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.primary.dark
    },
    color: 'white',
    width: 25,
    height: 20,
    border: 'none',
    position: 'absolute',
    top: 5,
    right: 5,
  },

  image: {
    display: "flex",
    flexDirection: "column",
    position: 'relative',
    
  }
  }));


  
  export default function ImageWrapper({ file, onDelete }) {
    const classes = useStyles();
    const dispatch = useDispatch();
  return (
    <Paper className={classes.image} justify="space-between" alignItems="center">
        <img width= '150px' src={file.secure_url} />
        <button className={classes.delete} size="small" onClick={function(e){
          e.preventDefault()
          onDelete(file)
          dispatch(addUrlToDelete(file.secure_url))
        }} 
        >X</button>
    </Paper>
  );
}