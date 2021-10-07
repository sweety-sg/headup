import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { flexbox } from '@material-ui/system';
import Popper from '@mui/material/Popper';
import { Button } from '@mui/material';
import './style.css';
import DeleteProject from './deleteproject';
import axios from "axios";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import EditProject from "./editproject";
import Modal from '@mui/material/Modal';
import './style.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cardstyle(props) {
    var color="";
    var boxshadow="";
    
    const [openproj, setOpenproj] = React.useState(false);
    const [proj, setProj] = React.useState({});
    // const handleOpenproj = () => setOpenproj(true);
    const handleCloseproj = () => setOpenproj(false);
 const handleDelete= ()=>{
     if(props.type=="project"){
         console.log("hiii there");
          handleDeleteEventP(props.id);
     }
     if(props.type=="card"){
         console.log("hiii there");
         handleDeleteEventC(props.id);
     }
 }
 const handleEdit=()=>{
     if(props.type=="project"){
         setProj(props.comp)
         console.log(proj+"hemlo")
         console.log(proj.id)
         setOpenproj(true);
         setOpen((previousOpen) => !previousOpen);
     }
 }
 if(props.type=="project"){
     switch (props.status) {
         case "To be started":
             color= ("#FF0000")
             boxshadow= "0px -10px 9px -12px #ff0000 inset"
             break;
         case "Completed":
             color= ("#5CD85A")
             boxshadow= "0px -10px 9px -12px #5CD85A inset"
             break;
         case "completed":
             color= ("#5CD85A")
             boxshadow= "0px -10px 9px -12px #5CD85A inset"
             break;
     
         default:
            color= ("#FEDE00")
            boxshadow= "0px -10px 9px -12px #FEDE00 inset"
             break;
     }
 }
  if(props.type=="card"){
      if(props.status){
          color= ("#5CD85A")
          boxshadow= "0px -10px 9px -12px #5CD85A inset"
      }
      else{
          color= ("#FF0000")
          boxshadow= "0px -10px 9px -12px #ff0000 inset"
      }
 }
function handleDeleteEventP(id) {
        axios
            .delete("http://127.0.0.1:3000/headup/project/"+ id +"/", {
                headers: {"X-CSRFToken":Cookies.get('csrftoken') },
                params: {withCredentials : true}
            })
            .then((response)=>{
                console.log(response);
                window.location.reload();
            })
            .catch((err) => {
                console.log("uff")
                console.log(err);
            });
    };
function handleDeleteEventC(id) {
        axios
            .delete("http://127.0.0.1:3000/headup/card/"+ id +"/", {
                headers: {"X-CSRFToken":Cookies.get('csrftoken') },
                params: {withCredentials : true}
            })
            .then((response)=>{
                console.log(response);
                window.location.reload();
            })
            .catch((err) => {
                console.log("uff")
                console.log(err);
            });
    };
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  function createMarkup() {
  return {__html: props.content};
}
  return (
    <Card sx={{ maxWidth: 345 }} style= {{display:"flex", flexDirection: "column", justifyContent: "space-between", width:"100%", borderBottom:"3px solid #FEDE00", borderColor:color , boxShadow:boxshadow }} className="popeffect">
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton
           aria-label="settings" 
            
           >
            <MoreVertIcon onClick={handleClick}/>
            <Popper  open={open} anchorEl={anchorEl} placement="bottom-start" style={{width:"100px"}}>
            <div className="columnflex border">
            <Button variant="text" onClick={handleEdit}>Edit</Button>
            <Button variant="text" onClick={handleDelete}>Delete</Button>
            </div>
            </Popper>
            
          </IconButton>
        }
        title={props.title}
        subheader={props.subtitle}
      />
      <Modal
            open={openproj}
            onClose={handleCloseproj}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className= "modalclass"
            >
            <EditProject data = {proj}/>
            </Modal>
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <Link to={props.link} style={{textDecoration:"none"}}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <div dangerouslySetInnerHTML={createMarkup()}></div>
        </Typography>
      </CardContent>
      </Link>
      <CardActions disableSpacing style= {{display:flexbox, justifyContent:'flex-end' ,justifySelf: 'flex-end'}}>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <IconButton 
        aria-label="comment"

        >
          <CommentIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            okay
          </Typography>
          <Typography>
            get lost
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
