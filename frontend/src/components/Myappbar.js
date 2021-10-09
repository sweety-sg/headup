import React, {useRef} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Dashboard from '../Dashboard';
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { Icon, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {mainListItems ,secondaryListItems} from '../pages' ;
import Data from '../data';
import Project from './project';
import AddIcon from '@mui/icons-material/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import NewProject from './newProject';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { NavLink } from 'react-router-dom';
import './style.css'
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 10,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    TitleCont : {
        // flex:1,
        // flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        
    },
    linkcolor : { 
      color: 'white',
      fill: 'white'
    }
  }));
  export default function MyAppBar(props){
    const [openproj, setOpenproj] = React.useState(false);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpenproj = () => setOpenproj(!openproj);
    const handleCloseproj = () => setOpenproj(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
        <div className={classes.root}>
             <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/dashboard" style={{textDecoration:"none"}}>
            <IconButton >
            <HomeIcon style= {{marginLeft : 0 , marginRight : 4 ,color: 'white'}} />
            </IconButton>
            </Link>

            <Typography component="h1" variant="h6" color="inherit" style={{display:'inline'}}>
              {props.title}
            </Typography>
            <Container  className={classes.TitleCont} align='center'>
            
            <Icon>
            <GroupWorkIcon style= {{paddingLeft : 1 , paddingRight : 2.5}} />
            </Icon>
            <Typography component="h1" variant="h6" color="inherit" wrap style= {{paddingLeft : 2.5 , paddingRight : 1}}>
              HeadUp
            </Typography>
            </Container>
    
           <Tooltip title="Add new project">
            <IconButton 
            color="inherit"
            onClick={handleOpenproj}
            >
            <Badge color="secondary">
                <AddIcon />
              </Badge>
              </IconButton>
            </Tooltip>
            

            <Modal
            open={openproj}
            onClose={handleCloseproj}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className= "modalclass"
            >
            <div>
            <HighlightOffIcon style={{ position: "absolute" , right: "40px", top:"10px"}} onClick={handleCloseproj}/>
            <NewProject/>
            </div></Modal>
                 
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        </div>
    )
  }