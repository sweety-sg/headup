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

//   onMouseOver = () => this.setState({ shadow: 3 });

//   onMouseOut = () => this.setState({ shadow: 1 });
if(props.type=="project"){
    const Handledelete= ()=>{
        // <Deleteproject id={props.id}/>
    }
}
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
  return (
    <Card sx={{ maxWidth: 345 }} style= {{display:"flex", flexDirection: "column", justifyContent: "space-between", width:"100%"}}>
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
            <Popper  open={open} anchorEl={anchorEl}>
            <div className="columnflex border">
            <Button variant="text">Edit</Button>
            <Button variant="text">Delete</Button>
            </div>
            </Popper>
            
          </IconButton>
        }
        title={props.title}
        subheader={props.subtitle}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.content}
        </Typography>
      </CardContent>
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
