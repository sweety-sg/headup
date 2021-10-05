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
import MyAppBar from './Myappbar';

const ProjectPage=(props) =>{
//   const classes = useStyles();
  const Theme = useTheme();
  const projectId = props.match.params.projectId
  const [users, setUsers] = React.useState([]);
  const [project, setProject] = React.useState([]);
  async function fetchUsers() {
    axios
        .get('http://127.0.0.1:3000/headup/user/')
        .then((response) => {
            console.log("entered");
            console.log(response.data.results);
            setUsers(response.data.results);
            console.log("fetched users");
        })
        .catch((error) => console.log(error + "uff"));
}

React.useEffect(() => {
    // fetchCurrUserInfo();

    // setAlert({
    //   open: false,
    // });
  axios
  .get("http://127.0.0.1:3000/headup/project/"+projectId+"/")
  .then((res) => {
    console.log(res.data);
    setProject(res.data);
    console.log("yes");
  })
  .catch((err) => {
    console.log(err);
    console.log("no");
  });
}, [props.match.params.projectId]);



return(
    // "hello"
    <>
    <MyAppBar/>
            </>
)
}

export default ProjectPage