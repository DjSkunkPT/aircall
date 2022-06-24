import React, { useRef, useState } from "react";
import axios from "axios";

import {
  Grid,
  Typography,
  Slide,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Tab,
  Tabs,
  Button
} from "@mui/material";

import {
  ExpandMore,
  Phone,
  PhoneMissed,
  Voicemail
} from '@mui/icons-material'


function ActivityFeed(props) {
  const containerRef = useRef(null);

  const [tab, setTab] = useState('inbox');
  const [expanded, setExpanded] = useState(false);

  const changeCallState = (id, value) => {
    axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, { is_archived: value })
      .then(response => {
        console.log(response.data)
        props.getData();
      });
  }

  const handleTabs = (event, newValue) => {
    setExpanded('');
    setTab(newValue);
  };

  const handlePanels = (id) => (event, newExpanded) => {
    setExpanded(newExpanded ? id : false);
  };

  const renderIcon = (call) => {
    switch (call) {
      case 'answered':
        return <Phone sx={{ color: 'green' }} />
      case 'missed':
        return <PhoneMissed sx={{ color: 'red' }} />
      default:
        return <Voicemail color="primary" />
    }
  }

  const renderCalls = (callList) => {
    const calls = callList.map(call => {
      const date = new Date(call.created_at);
      return (
        <Accordion key={call.id} expanded={expanded === call.id} onChange={handlePanels(call.id)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Grid item sx={{ width: '33%', flexShrink: 0 }}>
              {renderIcon(call.call_type)}
            </Grid>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{call.from}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              From: {call.from}
            </Typography>
            <Typography variant="body2">
              Date: {date.toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Time: {date.toLocaleTimeString()}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            {call.is_archived
              ? <Button variant="outlined" size='small' onClick={() => changeCallState(call.id, false)}>Unarchive</Button>
              : <Button variant="outlined" size='small' onClick={() => changeCallState(call.id, true)}>Archive</Button>
            }
          </AccordionActions>
        </Accordion>
      )
    });
    return calls;
  }

  return (
    <Grid container ref={containerRef} overflow='auto'>
      <Grid item xs={12} sx={{ padding: '5px' }}>
        <Tabs value={tab} onChange={handleTabs} variant="fullWidth">
          <Tab label="Inbox" value='inbox' />
          <Tab label="Archived" value='archived' />
        </Tabs>
        {tab ==='inbox' && (
          <Slide direction='right' in={true} container={containerRef.current}>
            <div>
              {renderCalls(props.activeCalls)}
            </div>
          </Slide>
        )}
        {tab === 'archived' && (
          <Slide direction='left' in={true} container={containerRef.current}>
            <div>
              {renderCalls(props.archivedCalls)}
            </div>
          </Slide>
        )}
      </Grid>
    </Grid >
  )
}

export default ActivityFeed;