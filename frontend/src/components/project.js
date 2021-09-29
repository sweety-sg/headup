import React from 'react'
import axios from 'axios'

class Project extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            projects : []
          }
        // this.fetchTasks = this.fetchTasks.bind(this)
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
            return newItems.map(project => (
              <li 
                key={project.id}
              >
                <span 
                  >
                    {project.name}
                  </span>
              </li>
            ));
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

