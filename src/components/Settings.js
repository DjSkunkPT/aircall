import React, { useRef, useState } from "react";
import axios from "axios";

import {
  Grid,
  Typography,
  Skeleton
} from "@mui/material";

import {
  ExpandMore,
  Phone,
  PhoneMissed,
  Voicemail
} from '@mui/icons-material'


function Settings(props) {
  const containerRef = useRef(null);

  return (
    <Grid container ref={containerRef} spacing={2} sx={{ padding: '15px'}}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Settings
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="circular" width={40} height={40} />
      </Grid>
      <Grid item xs={10}>
        <Skeleton variant="rectangular" width='100%' height='100%' />
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="circular" width={40} height={40} />
      </Grid>
      <Grid item xs={10}>
        <Skeleton variant="rectangular" width='100%' height='100%' />
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="circular" width={40} height={40} />
      </Grid>
      <Grid item xs={10}>
        <Skeleton variant="rectangular" width='100%' height='100%' />
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="circular" width={40} height={40} />
      </Grid>
      <Grid item xs={10}>
        <Skeleton variant="rectangular" width='100%' height='100%' />
      </Grid>
    </Grid >
  )
}

export default Settings;