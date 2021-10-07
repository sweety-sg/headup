import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    {/* <ListItem button>
      <ListItemIcon>
        <Tooltip title="Dashboard" enterDelay={200} leaveDelay={100}>
        <DashboardIcon onClick={() => window.open('http://127.0.0.1:3000/dashboard')}/>
        </Tooltip>
        
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem> */}
    <ListItem button>
    <Tooltip title="Dashboard" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <DashboardIcon onClick={() => window.open('http://127.0.0.1:3000/dashboard')}/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
    <Tooltip title="Boards" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <LayersIcon onClick={() => window.open('http://127.0.0.1:3000/dashboard')}/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="All Boards" />
    </ListItem>
    <ListItem button>
    <Tooltip title="Users" enterDelay={200} leaveDelay={100} placement="right">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      
      </Tooltip>
      <ListItemText primary="Your Account" />
    </ListItem>  
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Assigned to you</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);