import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  imageDis: {
    display: "flex",
    flexDirection: "column",
    position: 'relative',
    justify: 'space-between',
  }
  }));

  export default function ImageWrapper({ file, onDelete }) {
    const classes = useStyles();
  return (
    <Paper className={classes.imageDis} variant="outlined" onClick={() => console.log('Hola')} onMouseEnter={() => console.log('Chau')} >
        <img width= '50px' src={file.url} />
    </Paper>
  );
}