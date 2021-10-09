import React, {useRef} from 'react';
import axios from "axios";
import Cardstyle from './Cardstyle';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CardContent from '@mui/material/CardContent';
import Popper from '@mui/material/Popper';
import Addcard from './addcard';
import { borders } from '@mui/system';
import { palette } from '@mui/system';
import Modal from '@mui/material/Modal';
import Addlist from './addlist';
import './style.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Editlist from './editlist';
import Box from '@material-ui/core/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Cookies from 'js-cookie';
class CardsofList extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.list.id + this.props.list.name);
        this.state = {
            cards : [],
            list: this.props.list,
            listId : this.props.list.id,
            projectId : this.props.projectId,
            opencard: false,
            openeditlist: false,
            openWarn: false,
            anchorel: null,
          }
        // this.fetchTasks = this.fetchTasks.bind(this)
    }
    handleClick = (event) => {
    this.setState({anchorel :(event.currentTarget)});
    
    this.setState({opencard: !this.state.opencard})
    
  };
//   handleOpen = () => {tthis.setState({openlist: true})}
//    handleClose = () => {this.setState({openlist: false})}
//    handleOpenproj = () => {this.setState({openproj: true})}
//    handleCloseproj = () => {this.setState({openproj: false})}
    handleOpeneditlist = () => {this.setState({openeditlist: true})}
   handleCloseeditlist = () => {this.setState({openeditlist: false})}
   handleWarning = () => {this.setState({openWarn: true})}
   handleCloseWarning = () => {this.setState({openWarn: false})}
   handleDelete = () => {
       this.setState({openWarn: false});
       axios
            .delete("http://127.0.0.1:3000/headup/list/"+ this.props.list.id +"/", {
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
       
       }

Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

    async componentWillMount(){
        const listId = this.state.listId
        const projectId = this.state.projectId
        console.log("called for " + projectId)
        try {
            const res = await fetch("http://127.0.0.1:8000/headup/project/" +projectId+"/lists/" + listId , {
              method : "GET",
            });
            const cards = await res.json();
            this.setState({
              cards :  cards
            });
          } catch (e) {
            console.log(e);
          }
          

    }
    renderItems = () => {
        const cards = this.state.cards;
        const listId = this.state.listId;
        
        return(
            <>
                   
                     <div style={{margin: "20", display:"flex", padding:15, height:"auto"}}>
                     <Card sx={{ width: 345 ,height: "auto"}} style= {{display:"flex", flexDirection: "column",  alignSelf:"flex-start", maxHeight: "1200px", overflow:"scroll"}} >
                        <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: "#336EF1" }}>
                            <AssignmentIcon />
                          </Avatar>
                        }
                        action={
                            <div>
                        <IconButton aria-label="settings" onClick={() => this.handleOpeneditlist()} >
                            <EditOutlinedIcon style={{fill:"#5CD85A"}} />
                        </IconButton>
                        <IconButton aria-label="settings" >
                            <DeleteOutlinedIcon 
                            style={{fill:"#FF0000"}} 
                            onClick={() => this.handleWarning()}
                            />
                        </IconButton>
                        </div>
                        }
                        title={this.state.list.name}
                        // subheader={props.subtitle}
                    />
                    <Modal
                        open={this.state.openeditlist}
                        onClose={this.handleCloseeditlist}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className= "modalclass"
                        style={{height: "300px"}}
                        >
                        <Editlist list={this.props.list} listID = {this.props.list.id} listName= {this.state.list.name} proj={this.state.list.project}/>
                        </Modal>
                    <Dialog
                        open={this.state.openWarn}
                        onClose={this.handleCloseWarning}
                        aria-describedby="alert-dialog-slide-description"
                        // className= "modalclass"
                        TransitionComponent={this.Transition}
                        keepMounted
                        // style={{maxheight: }}
                        >
                        <DialogTitle>{<WarningAmberIcon style={{fill:"#FF0000", fontSize:"30px"}}/>}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this list? Deleting a list would delete all the associated cards too.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleCloseWarning}>Cancel</Button>
                        <Button onClick={this.handleDelete} style={{color:"#FF0000"}}>Delete</Button>
                        </DialogActions>
                        
                        </Dialog>
                        
                        <div style={{display:"flex", justifycontent: "space-evenly", flexDirection :"row", flexWrap:'wrap', width:"100%"}}>
                            {cards.map((card) => (
                            <>
                        <div style={{margin: "20", display:"flex", padding:15, width:"100%"}}>
                        <Cardstyle title= {card.title}  content={card.description} type="card" id={card.id} status={card.status} comp={card} projectId={this.state.projectId}/>
                        <Divider/>
                            </div>
                            </>
                                ))}
                                
                        </div>

                        <Button aria-describedby={this.state.list.id} variant="outlined" startIcon= {<AddIcon/>} onClick={this.handleClick} style={{margin: 15}}>
                        Add Card
                        </Button>

                        <Popper id={this.state.list.id} open={this.state.opencard} anchorEl={this.state.anchorel}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' ,borderColor:'primary.main'}}>
                            <Addcard list={this.state.list} projectId={this.state.projectId}/>
                        </Box>
                        </Popper>
                         </Card>
                   </div>
                   </>


        //   <div style={{display:"flex", justifycontent: "space-evenly", flexDirection :"row", flexWrap:'wrap', width:"100%"}}>
        //     {cards.map((card) => (
        //     <>
        //  <div style={{margin: "20", display:"flex", padding:15, width:"100%"}}>
        //  <Cardstyle title= {card.title}  content={card.description} type="card" id={card.id} status={card.status} comp={card} projectId={this.state.projectId}/>
        //  <Divider/>
        //     </div>
        //     </>
        //         ))}
                
        //   </div>
        )
      };
  
      render(){
        return (
          <main className="content">
          <div >
        {this.renderItems()}
                
          </div>

        </main>
        )
      }
    
    //   return(
    //     {cards.map((card) => (
    //         <>
    //      <div style={{margin: "20", display:"flex", padding:15}}>
    //      <Cardstyle title= {card.title}  content={card.description}/>
    //      <Divider/>
    //    </div>
    //    </>
    //     ))}
    //   )
      
}
export default CardsofList;