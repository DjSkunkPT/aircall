import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import {
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
  Fade
} from "@mui/material";

import {
  Person,
  Phone,
  Settings,
  MoreVert
} from '@mui/icons-material'

import Header from './Header.jsx';
import ActivityFeed from './components/ActivityFeed.js';
import Profile from './components/Profile.js';
import SettingsScreen from './components/Settings.js';

const App = () => {
  const [callList, setCallList] = useState([]);
  const [screen, setScreen] = useState('calls')
  const [archivedCalls, setArchivedCalls] = useState([])
  const [activeCalls, setActiveCalls] = useState([])

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('https://aircall-job.herokuapp.com/activities')
      .then(response => {
        console.log(response.data)
        setCallList(response.data)
        setArchivedCalls(response.data.filter(call => (call.is_archived)))
        setActiveCalls(response.data.filter(call => (!call.is_archived)))
      });
  }
  return (
    <Grid container className='container' direction='column'>
      <Grid item xs='auto'>
        <Header />
      </Grid>
      <Grid item xs container direction='column'>
        <Grid item xs>
          {screen === 'calls' && (
            <Fade in={true} timeout={700}>
              <div>
                <ActivityFeed activeCalls={activeCalls} archivedCalls={archivedCalls} getData={getData} />
              </div>
            </Fade>
          )}
          {screen === 'profile' && (
            <Fade in={true} timeout={700}>
              <div>
                <Profile />
              </div>
            </Fade>
          )}
          {screen === 'settings' && (
            <Fade in={true} timeout={700}>
              <div>
                <SettingsScreen />
              </div>
            </Fade>
          )}
        </Grid>
        <Grid item xs='auto'>
          <Paper elevation={3}>
            <BottomNavigation
              value={screen}
              sx={{ borderRadius: '0px 0px 10px 10px' }}
              onChange={(event, newValue) => {
                setScreen(newValue);
              }}
            >
              <BottomNavigationAction
                label="Calls"
                value="calls"
                icon={
                  <Badge badgeContent={activeCalls.length} color='primary'>
                    <Phone />
                  </Badge>
                }
              />
              <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<Person />}
              />
              <BottomNavigationAction
                label="Settings"
                value="settings"
                icon={<Settings />}
              />
              <BottomNavigationAction
                label="More"
                value="more"
                icon={<MoreVert />}
              />
            </BottomNavigation>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
