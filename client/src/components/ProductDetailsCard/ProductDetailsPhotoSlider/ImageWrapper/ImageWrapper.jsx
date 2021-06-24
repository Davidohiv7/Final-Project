import React from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './styles';

export default function ImageWrapper({ file, onDelete }) {
    const classes = useStyles();
  return (
    <Paper className={classes.imageDis} variant="outlined" onClick={() => console.log('Hola')} onMouseEnter={() => console.log('Chau')} >
        <img width= '50px' src={file.url} alt="Small Show Picture" />
    </Paper>
  );
}