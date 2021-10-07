import React, {useRef} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { useTheme, makeStyles, createTheme } from "@material-ui/core/styles";
import Dashboard from '../Dashboard';
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
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
import './style.css';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cardstyle from './Cardstyle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CardContent from '@mui/material/CardContent';
import CardsofList from './cardsoflist';
import Popper from '@mui/material/Popper';
import Addcard from './addcard';
import { borders } from '@mui/system';
import { palette } from '@mui/system';
import Modal from '@mui/material/Modal';
import Addlist from './addlist';
import './style.css'



const theme = createTheme({
  typography: {
    
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
const useStyles = makeStyles((theme) => ({

}))
const ProjectPage=(props) =>{
  const classes = useStyles();
//   const Theme = useTheme();
  const projectId = props.match.params.projectId
  const [users, setUsers] = React.useState([]);
  const [project, setProject] = React.useState([]);
  const [lists, setLists] = React.useState([]);
  const [currlist, setcurrList] = React.useState([]);
  var [currentCards, setCurrentCards] = React.useState([]);
  const [allLists, setallLists] = React.useState([]);
  const [allCards, setallCards] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openlist, setOpenlist] = React.useState(false);
  const [openproj, setOpenproj] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = () => setOpenlist(true);
  const handleClose = () => setOpenlist(false);
  const handleOpenproj = () => setOpenproj(true);
  const handleCloseproj = () => setOpenproj(false);

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
axios
.get("http://127.0.0.1:3000/headup/projects/"+projectId+"/lists")
.then((res) => {
  console.log(res.data[0]);
  setLists(res.data);
  console.log("yes");
})
.catch((err) => {
  console.log(err);
  console.log("no");
});


},[]);


// function fetchCards(lis){
//     var listId = lis.id
//     console.log("called for " + listId)
//     axios
//     .get("http://127.0.0.1:8000/headup/project/" +projectId+"/lists/" + listId ).then((res) =>{
//         console.log(res.data);
//         setCurrentCards(res.data);
//         console.log("yes");
//     })
//     .catch((err) => {
//         console.log(err);
//         console.log("no");
//       });
      
// }

// async function componentWillMount(){
//     {lists.map((list) => (
//         <>
//         {fetchCards.call(this,list)}
//         {data.append(currentCards)}
        
//         </>
//     ))};
// }
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
return(
    // "hello"
    <>
    
    <MyAppBar addnew="Add new project"/>

    <div style={{marginTop:"50px", padding:"2rem"}}>
    <div className="columnflexx">
    <Typography variant="h4" className="font-head">
        {project.name}
    </Typography>
    <Button variant="contained" style={{marginLeft:"2rem", padding:"12px", height:"60%"}} endIcon={<VisibilityIcon/>} flexWrap>
    Visibility
    </Button>
    <Button onClick={handleOpen} endIcon={<AddIcon/>} style={{justifySelf:"flex-end", position:"absolute", right:"2rem"}}>Add List</Button>
    <Modal
        open={openlist}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className= "modalclass"
        style={{height:"250px"}}
      >
          <Addlist projectId={projectId} />
      </Modal>
    </div>
    
    <Divider/>
    <div style={{display:"flex", justifycontent: "flex-start", flexDirection :"row", flexWrap:'wrap' , alignContent:"flex-start"}} className="font-body">
                {lists.map((list) => (
                  <>
                    {/* {fetchCards.call(this,list)} */}
                   
                     <div style={{margin: "20", display:"flex", padding:15, height:"auto"}}>
                     <Card sx={{ width: 345 ,height: "auto"}} style= {{display:"flex", flexDirection: "column", height:"auto", alignSelf:"flex-start", maxHeight: "1000px", overflow:"scroll"}} className="cardclass">
                        <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: "#336EF1" }}>
                            <AssignmentIcon />
                          </Avatar>
                        }
                        action={
                            <div>
                        <IconButton aria-label="settings" >
                            <MoreVertIcon />
                        </IconButton>
                        <IconButton aria-label="settings" >
                            <MoreVertIcon />
                        </IconButton>
                        </div>
                        }
                        title={list.name}
                        // subheader={props.subtitle}
                    />
                    
                        <CardsofList listId={list.id} projectId= {projectId} style={{width:"100%"}}/>
                        <Button aria-describedby={list.id} variant="outlined" startIcon= {<AddIcon/>} onClick={handleClick} style={{margin: 15}}>
                        Add Card
                        </Button>

                        <Popper id={list.id} open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' ,borderColor:'primary.main'}}>
                            <Addcard list={list} projectId={projectId}/>
                        </Box>
                        </Popper>
                         </Card>
                   </div>
                   </>
                    ))}
                    
              </div>
    </div>
    
    </>
)
}

export default ProjectPage