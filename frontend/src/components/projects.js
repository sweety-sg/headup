// import React from 'react'
// import axios from 'axios'
// import Cardstyle from './Cardstyle';
// import { Divider } from '@material-ui/core';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
// import EditProject from './editproject';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Popper from '@mui/material/Popper';
// import "./style.css";
// import MyAppBar from './Myappbar'
// import { makeStyles , createTheme} from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
// appBarSpacer: theme.mixins.toolbar,
//     content: {
//       flexGrow: 1,
//       height: '100vh',
//       overflow: 'auto',
//     },
// }));
// export default function Projects(){
//     const classes = useStyles();
//     const [projects, setProjects] = React.useState([]);

//     async function fetchProjects() {
            
//             }
//     React.useEffect(() =>{
//         fetchProjects()
//     },[]);

//     return(
//         <div style={{display:"flex"}}>
//         <MyAppBar title="Projects" />
//         ...
//         <div className={classes.content} style={{marginTop: "60px",flexWrap:"wrap"}}>
//             <div style={{width:"100%"}}>
            
//             </div>

//             <div style={{display:"flex", padding: "1rem", flexWrap:"wrap"}} Wrap>
//             {projects.map((project)=>(
//                 // <>
//                 <Card style={{display:"flex", justifyContent:"space-around",padding: "0.5rem", margin:"1rem", flexWrap:'wrap'}} className="user-cards" Wrap>
//                 <div style={{display:"flex",justifyContent:"space-around",flexWrap:'wrap',width:"100%"}}>
//                 <div style={{margin:"0.5rem"}}>
//                 <Avatar style={{height:"90px",width:"90px"}}>
//                 P
//                 </Avatar>
//                 </div>
//                 <div className="font-body columnflex" style={{margin:"0.5rem",height:"100px", alignSelf:"center", justifyContent:"center"}}>
//                      <Typography variant="h6" gutterBottom  component="div">
//                         {project.name}
//                     </Typography>
//                     <Typography variant="subtitle2" component="div">
//                         Created by {project.created}
//                     </Typography>
//                     {/* {project.is_admin && */}
//                     <Typography variant="overline" display="block" gutterBottom>
//                         {project.wiki}
//                     </Typography>
//                     {/* } */}


//                 </div>
//                 </div>
//                 </Card>
//                 // </>
//             ))}
//             </div>
//         </div>
//         </div>
//     )
// }