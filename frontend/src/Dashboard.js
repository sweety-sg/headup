import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import { makeStyles , createTheme} from '@material-ui/core/styles';
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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { Icon, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {mainListItems ,secondaryListItems} from './pages.js' ;
import Data from './data';
import Project from './components/project';
import AddIcon from '@mui/icons-material/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MyAppBar from './components/Myappbar'
import Modal from '@mui/material/Modal';
import NewProject from './components/newProject';
import './components/style.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fab } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import white from "material-ui/core/colors/white";

// const history = useHistory();

// const routeChange = () =>{ 
//   let path = `newPath`; 
//   history.push(path);l
// }

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://127.0.0.1:3000/dashboard">
          HeadUp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
 function tonewPro(){
   return(
     <Link to="/newproject"></Link>
   )
 }
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
        background: '#ffffff'
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function Dashboard(props) {
  let history = useHistory();

  async function fetchUserDetails(){
        axios
            .get('http://127.0.0.1:3000/headup/user/info', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
            .then((response) => {
                if(response.data.disabled){
                    history.push("/404");
                }
            })
            .catch((error) => {
                history.push("/");
                console.log(error)
            });
    }
  React.useEffect(()=>{
      fetchUserDetails();
  }, []);

    const [light, setLight] = React.useState(true);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openproj, setOpenproj] = React.useState(false);
    const handleOpenproj = () => setOpenproj(true);
    const handleCloseproj = () => setOpenproj(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        
        <MyAppBar title="Dashboard"/>
        <div style={{marginTop:"100px",justifySelf:"center", width:"100%"}} className="contains tab-div">
        <Box sx={{ width: '100%' }} className="contains tab-div">
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' ,margin:"auto",width:"100%"}} className="tab-div"> */}
          <Tabs value={value} onChange={handleChange}  style={{width:"100%", align:"center" , display:"flex", justifyContent:"space-between", margin:"auto",paddingLeft:"3rem",paddingRight:"3rem"}} className="tab-div tabs">
            <Tab label="Your Projects" {...a11yProps(0)} style={{width:"50%"}} className="one-tab"/>
            <Tab label="Your Cards" {...a11yProps(1)}  style={{width:"50%"}} className="one-tab"/>
          </Tabs>
        {/* </Box> */}
        <Divider/>
        <TabPanel value={value} index={0}>
          <Project/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Data/>
        </TabPanel>
      </Box>
      </div>
        {/* <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h6">  Your Projects </Typography>
          <Project />
            <Typography variant="h6">  Your Cards </Typography>
            <Data />
            <Fab color="primary" aria-label="add" className="fixedfab" onClick={handleOpenproj}>
              <AddIcon />
            </Fab>
            <Divider />
            
            <Box pt={4}>
              <Copyright />
              
            </Box>
            
          </Container>
        </main> */}
      </div>
    );
  }