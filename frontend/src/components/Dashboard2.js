import { Typography } from "@material-ui/core";
import Dashboard from "../Dashboard";
import Data from "../data";
import Project from "./project";
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
<Dashboard title="Dashboard" containerElement={
    <div>
        <Typography variant="h6">  Your Projects </Typography>
          <Project />
            <Typography variant="h6">  Your Cards </Typography>
            <Data />
            <Divider />
            <Box pt={4}>
              <Copyright />
            </Box>
    </div>
}/>

export default Dashboard;