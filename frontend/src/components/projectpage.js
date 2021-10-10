import React, {useRef} from 'react';
import axios from "axios";
import { useTheme, makeStyles, createTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@mui/icons-material/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MyAppBar from './Myappbar';
import './style.css';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardsofList from './cardsoflist';
import Popper from '@mui/material/Popper';
import Addcard from './addcard';
import { borders } from '@mui/system';
import { palette } from '@mui/system';
import Modal from '@mui/material/Modal';
import Addlist from './addlist';
import Cookies from 'js-cookie';
import './style.css';
import { useHistory } from "react-router-dom";




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
  const [openeditlist, setOpeneditlist] = React.useState(false);
  const [openproj, setOpenproj] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = () => setOpenlist(true);
  const handleClose = () => setOpenlist(false);
  const handleOpenproj = () => setOpenproj(true);
  const handleCloseproj = () => setOpenproj(false);
    const handleOpeneditlist = () => {setOpeneditlist(true)};
  const handleCloseeditlist = () => setOpeneditlist(false);
  var lis = {}
  let history = useHistory();

        async function fetchUserDetails(){
                axios
                    .get('http://127.0.0.1:3000/headup/user/info', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
                    .then((response) => {
                        if(response.data.disabled){
                            history.push("/404");
                        }
                        // else{
                        //     setUserinfo(response.data)
                        // }
                    })
                    .catch((error) => {
                        history.push("/");
                        console.log(error)
                    });
            }

React.useEffect(() => {
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
fetchUserDetails();

},[]);


const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
return(
    // "hello"
    <div style={{display:"flex"}}>
    
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
    {/* <ListofProject projectId= {projectId} lists={lists}/> */}
   
    <div style={{display:"flex", flexDirection :"row", flexWrap:'wrap' }} className="font-body">
                {lists.map((list) => (
                  <>
                   <CardsofList list={list} projectId= {projectId} listID={list.id}/>
                   </>
                    ))}
                    
              </div>
    </div>
    
    </div>
)
}

export default ProjectPage