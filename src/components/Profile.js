import React, { useRef, useState } from "react";
import axios from "axios";

import {
  Grid,
  Typography,
} from "@mui/material";

import {
  AccountCircle,
  Email,
  Phone
} from '@mui/icons-material'


function Profile(props) {
  const containerRef = useRef(null);

  return (
    <Grid container ref={containerRef} sx={{ width: '100%', padding: '5px' }} overflow='auto' spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Profile
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <AccountCircle sx={{ fontSize: '40px' }} />
      </Grid>
      <Grid item xs={10} container alignItems='center'>
        <Typography variant='h6' align="center">
          Bruno Silva
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Phone />
      </Grid>
      <Grid item xs={10}>
        <Typography>
          +1 (365) 888-1710
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Email />
      </Grid>
      <Grid item xs={10}>
        <Typography>
          bmeneses.silva@gmail.com
        </Typography>
      </Grid>
    </Grid >
  )
}

export default Profile;