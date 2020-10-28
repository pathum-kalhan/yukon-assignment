import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

export default function NavBar({ title = 'Yukon Assignment' }) {
  return (
    <AppBar position='relative'>
      <Toolbar>{title}</Toolbar>
    </AppBar>
  );
}
