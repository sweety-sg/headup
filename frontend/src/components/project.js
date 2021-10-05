import React from 'react'
import axios from 'axios'
import Cardstyle from './Cardstyle';
import { Divider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import EditProject from './editproject';

class Project extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            projects : []
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
    
    renderItems = () => {
            const newItems = this.state.projects
            var data={
              project : newItems.at(0)
            }
            return(
              <div style={{display:"flex", justifycontent: "space-evenly", flexDirection :"row", flexWrap:'wrap'}}>
                {newItems.map((project) => (
                  <>
                  
                    {/* <Link to="editproject" data={data}>hello</Link> */}
                    
                     <div style={{margin: "20", display:"flex", padding:15}}>
                     <Cardstyle title= {project.name} subtitle={project.status} content={project.wiki}/>
                     <Divider/>
                   </div>
                   </>
                    ))}
                    {/* <EditProject data={data} /> */}
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

