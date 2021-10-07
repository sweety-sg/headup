import React from 'react'
import axios from 'axios'
import Cardstyle from './Cardstyle';
import { Divider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import EditProject from './editproject';
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
import Popper from '@mui/material/Popper';

class Project extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            projects : [],
            open:false,
            anchorEl: null
          }
        // this.fetchTasks = this.fetchTasks.bind(this)
    }
    dialogfunc(){
      console.log("called")
    }
    async componentWillMount(){
      var headers = new Headers()
        headers = {
        //   "csrf_token" : '',
        //   "sessionid" : '',
        }
        try {
          const res = await fetch('http://127.0.0.1:3000/headup/user/projects', {
            method : "GET",
          });
          const projects = await res.json();
          console.log(projects)
          this.setState({
            projects :  projects
          });
        } catch (e) {
          console.log(e);
        }
        // this.fetchTasks()
    }
    
  //  handleClick(event){
  //   this.state.anchorEl= event.currentTarget;
  //   // setOpen((previousOpen) => !previousOpen);
  //   this.state.open = !(this.state.open);
  // };
  
    renderItems = () => {
            const newItems = this.state.projects
            var data={
              project : newItems.at(0)
            }
            return(
              <div style={{display:"flex", justifycontent: "space-evenly", flexDirection :"row", flexWrap:'wrap'}}>
                {newItems.map((project) => (
                  <>
                    {/* {
                      (()=> {
                        var color = (project.status =="To be started") ?"red": (project.status =="In-Progress"?"yellow" : (project.status =="Completed" ? "green"))
                        
                      })()
                    } */}
                     <div style={{margin: "20", display:"flex", padding:15}}>
                     
                    
                     <Cardstyle
                      title= {project.name}
                       subtitle={project.status} 
                       content={project.wiki} 
                       id={project.id} 
                       type="project" 
                       link={`projects/${project.id}`} 
                       status={project.status}
                       comp = {project}
                       />
                     {/* </Link> */}
                     
                     <Divider/>
                   </div>
                   
                   </>
                    ))}
              </div>
            )
          };
      
          render(){
            return (
              <main className="content">
              <div >
                <div>
                  <div>
                    <ul>
                      {this.renderItems()}
                    </ul>
                  </div>
                </div>
              </div>

            </main>
            )
          }
}


export default Project;

