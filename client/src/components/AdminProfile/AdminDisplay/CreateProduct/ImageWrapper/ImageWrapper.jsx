import { Button, Grid } from '@material-ui/core';
import React from 'react';



export default function ImageWrapper({ file, onDelete }) {
  return (
    <Grid container justify="space-between" alignItems="center">
      
      <Grid item>
        <Button size="small" onClick={() => onDelete(file)}>
          Delete
        </Button>
        {/* <img src={file.preview} /> */}
        <img src={file.secure_url} />
      </Grid>
    </Grid>
  );
}