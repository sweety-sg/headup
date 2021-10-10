import React from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Cardstyle from './Cardstyle';
import { Divider, Tooltip } from '@material-ui/core';
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
import "./style.css";
import MyAppBar from './Myappbar'
import { makeStyles , createTheme} from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';


const useStyles = makeStyles((theme) => ({
appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
}));
function createMarkup(wiki) {
    return {__html: wiki};
  }
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

export default function Projects(){
    let history = useHistory();

        async function fetchUserDetails(){
                axios
                    .get('http://127.0.0.1:3000/headup/user/info', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
                    .then((response) => {
                        if(response.data.disabled){
                            history.push("/404");
                        }
                    })
                    .catch((error) => {
                        history.push("/");
                        console.log(error)
                    });
            }
        React.useEffect(()=>{
            fetchUserDetails();
        }, []);

    const classes = useStyles();
    const [projects, setProjects] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    // const [next,setnext]= React.useState("http://127.0.0.1:3000/headup/project/")
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function fetchUsers() {
        axios
            .get('http://127.0.0.1:3000/headup/user/')
            .then((response) => {
                console.log("entered");
                console.log(response.data);
                setUsers(response.data);
                console.log("fetched users");
            })
            .catch((error) => console.log(error + "uff"));
    }

    async function fetchProjects() {
                axios
                .get("http://127.0.0.1:3000/headup/project/")
                .then((response) => {
                    setProjects(response.data)
                    console.log(response)
                })
                .catch((error) => console.log(error + "uff"));
            
            
            }
    React.useEffect(() =>{
        fetchProjects()
        fetchUsers()
    },[]);

    return(
        <div style={{display:"flex"}}>
        <MyAppBar title="Projects" />
        ...
        <div className={classes.content} style={{marginTop: "60px",flexWrap:"wrap"}}>
            <div style={{width:"100%"}}>
            
            </div>

            <div style={{display:"flex", padding: "1rem", flexWrap:"wrap"}} Wrap>
            
            {projects.map((project)=>(
                <>
                
                {project.visible &&
                <Card sx={{ maxWidth: 345 , margin:"2rem"}} className="project-card">
                <CardHeader 
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="">
                      P
                    </Avatar>
                  }
                //   action={
                //     <IconButton aria-label="settings">
                //       <MoreVertIcon />
                //     </IconButton>
                //   }
                  title={project.name}
                  subheader={project.start_date}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                  {project.status}
                  </Typography>
                  <div className="member-chips">
                    <Typography variant="body2" color="text.primary">
                    Members:
                    </Typography>
                        {project.project_members.map((value) => (
                        <Chip
                            avatar={<Avatar 
                                alt={value.full_name} 
                                src={users.filter((user, index) => user.id == value.id)[0]
                                    .image }
                                />}
                            key={value.id}
                            label={
                            // users.filter((user, index) => user.id == value)[0]
                            //     .full_name
                            value.full_name
                            }
                            // style={{ margin: "10px", borderRadius: "20px" }}
                            variant="outlined"
                            className="name-chip"
                        />
                        ))}
                    </div>
                    <div className="member-chips">
                    <Typography variant="body2" color="text.primary">
                    Admins:
                    </Typography>
                        {project.project_admins.map((value) => (
                        <Chip
                            avatar=
                            {<Avatar alt={
                                users.filter((user, index) => user.id == value)[0]
                                .full_name
                            } 
                            src={users.filter((user, index) => user.id == value)[0]
                            .image }
                            />}
                            key={value}
                            label={
                            users.filter((user, index) => user.id == value)[0]
                                .full_name
                            }
                            className="name-chip"
                            variant="outlined"
                        />
                        ))}
                    </div>
                </CardContent>
                <CardActions disableSpacing style={{justifySelf:"flex-end"}} className="end">
                  {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton> */}
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                      <Tooltip title="More info">
                    <ExpandMoreIcon/>
                    </Tooltip>
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                    <div dangerouslySetInnerHTML={createMarkup(project.wiki)}></div>
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            }
                 </> 
            ))}
           
            </div>
        </div>
        </div>
    )
}