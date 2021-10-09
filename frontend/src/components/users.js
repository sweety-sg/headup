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
import MyAppBar from './Myappbar'
import { makeStyles , createTheme} from '@material-ui/core/styles';

import "./style.css";
const useStyles = makeStyles((theme) => ({
appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
}));
export default function Users(){
    const classes = useStyles();
    const [users, setUsers] = React.useState([]);
    async function fetchUsers() {
            axios
                .get('http://127.0.0.1:3000/headup/user/')
                .then((response) => {
                    setUsers(response.data.results);
                })
                .catch((error) => console.log(error + "uff"));
            }
    React.useEffect(() =>{
        fetchUsers()
    },[]);
    
    function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
    }
    function stringAvatar(name) {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
        }

    return(
        <div style={{display:"flex"}}>
        <MyAppBar title="Users" />
        <main className={classes.content} style={{marginTop: "60px"}}>
            <div style={{width:"100%"}}>
            
            </div>

            <div style={{display:"flex", padding: "1rem", flexWrap:"wrap"}}>
            {users.map((user)=>(
                // <>
                <Card style={{display:"flex", justifyContent:"space-around",padding: "0.5rem", margin:"1rem", flexWrap:'wrap'}} className="user-cards" Wrap>
                <div style={{display:"flex",justifyContent:"space-around",flexWrap:'wrap',width:"100%"}}>
                <div style={{margin:"0.5rem"}}>
                <Avatar {...stringAvatar(user.full_name)} style={{height:"90px",width:"90px"}}/>
                </div>
                <div className="font-body columnflex" style={{margin:"0.5rem",height:"100px", alignSelf:"center", justifyContent:"center"}}>
                     <Typography variant="h6" gutterBottom  component="div">
                        {user.full_name}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {user.email}
                    </Typography>
                    {user.is_admin &&
                        <Typography variant="overline" display="block" gutterBottom>
                        Admin
                    </Typography>
                    }


                </div>
                </div>
                </Card>
                // </>
            ))}
            </div>
        </main>
        </div>
    )
}
