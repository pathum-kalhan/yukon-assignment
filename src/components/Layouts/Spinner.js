import React from 'react';
import { Grid } from '@material-ui/core';

export default function Spinner() {
  return (
    <Grid container justify="center">
      <Grid item>
        <img alt='Data is loading...' src='spinner.gif' />
      </Grid>
    </Grid>
  );
}
