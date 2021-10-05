import logo from './logo.svg';
import './App.css';
import Users from './components/users/users'
// import axios from '../../axios'
import Dashboard from './Dashboard';
import Data from './data.js';
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Home from './components/Login/home';
import Login from './components/Login/login';
import Project from './components/project';
import NewProject from './components/newProject';
import  Cardstyle from './components/Cardstyle';
import EditProject from './components/editproject';
import ProjectPage from './components/projectpage';

const App = () => {
  return (
    <>
    <div>
    <Route exact path="/">
        < Home />
      </Route>
      <Route exact path="/login">
        < Login />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard title = "Dashboard"/>
        <Data />
      </Route>
      <Route exact path="/projects">
        <Project />
      </Route>
      <Route exact path="/newproject">
        <NewProject />
      </Route>
      <Route exact path="/editproject">
        <EditProject />
      </Route>
      <Route exact path="/cardstyle">
        <Cardstyle />
      </Route>
      <Route exact path="/projects/:projectId" component={ProjectPage} />
      
      {/* <Users /> */}
    </div>
    
    </>
  )
}

export default App



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//           <Typography variant="h1">Shut up</Typography>
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
