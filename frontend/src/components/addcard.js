import * as React from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { flexbox } from '@material-ui/system';
import Cookies from 'js-cookie';
import { Checkbox } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { Editor } from '@tinymce/tinymce-react';

export default function Addcard(props){
    const listId = props.list.id 
    console.log(listId+"list")
    // const project = props.project
    const projectId = props.projectId
    const [formData, setFormData] = React.useState({
        title: "",
        list : listId,
      });
    // const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState([true,false]);
    const [assignees, setAssignees] = React.useState([]);
    const [members, setMembers] = React.useState([]);
    const [des, setDes] = React.useState("");
    const [checked, setChecked] = React.useState(false);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      };

    const handleAssigneesChange = (e) => {
        setAssignees(e.target.value);
        console.log(members)
      };
    const handleStatusChange = (event, data) => {
        console.log(event.target.checked);
        setChecked([event.target.checked, event.target.checked]);
        setStatus(event.target.checked)
    }
    const handleDesChange = (content, editor) => {
        setDes(content);
      };
    async function fetchMembers() {
        axios
            .get('http://127.0.0.1:3000/headup/project/' + projectId)
            .then((response) => {
                console.log("entered");
                console.log(response.data);
                setMembers(response.data.project_members);
                console.log("fetched members");
                console.log(members + "hi")
            })
            .catch((error) => console.log(error + "uff"));
    }

    var csrf = Cookies.get("csrftoken");
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            title : formData.title,
            description : des,
            status : status,
            asignees : assignees,
            list : formData.list,
        }
        axios
          .post("http://127.0.0.1:3000/headup/card/", data, {
            headers: { "Content-Type": "application/json" ,  "X-CSRFToken": csrf},  params: {withCredentials : true}
          })
          .then((res) => {
            console.log(res);
            console.log("posted form");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            console.log("can't post form");
          });
      };

    React.useEffect(()=>{
        fetchMembers();

    }, []);

    return(
        <Container component="main" maxWidth="xs" >
            <div style={{  padding: "5px 5px", outline: "10px solid #e6e6e6e"}}>
            {/* <Paper className=".MuiPaper-outlined" sx={{ width: 10 }}> */}
                <form onSubmit={handleFormSubmit} noValidate>
                <Grid container spacing={2}>
                    <Typography className="form-label">Title</Typography>
                    <Grid
                    item
                    xs={12}
                    className="custom-form-outline"
                    style={props.borderClass}
                    >
                    <TextField
                        name="title"
                        fullWidth
                        id="title"
                        value={formData.title}
                        onChange={handleFormChange}
                    />
                    </Grid>

                    <Typography className="form-label">Description</Typography>
                    <Grid
                    item
                    xs={12}
                    name="des"
                    style={{
                        ...props.borderClass,
                        padding: "0",
                        borderRadius: "4px",
                        margin: "10px",
                    }}
                    >
                        <Editor
                  value={des}
                  init={{
                    icons: "thin",
                    height: 200,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount table",
                    ],
                    toolbar: [
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | table | code | help",
                    ],
                  }}
                  onEditorChange={handleDesChange}
                />
                </Grid>

                <Typography className="form-label">Assignees</Typography>
                <Grid item xs={12}>
                <Select
                    className="custom-form-selection-outline"
                    labelId="mutiple-chip-label"
                    id="mutiple-chip"
                    style={props.borderClass}
                    style={{  width: "100%"}}
                    multiple
                    value={assignees}
                    onChange={handleAssigneesChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                        <Chip
                            key={value}
                            label={
                            members.filter((member, index) => member.id == value)[0]
                                .full_name
                            }
                            style={{ margin: "10px", borderRadius: "5px" }}
                        />
                        ))}
                    </div>
                    )}
                >
                    {members.map((member) => (
                    <MenuItem key={member.full_name} value={member.id}>
                        {member.full_name}
                    </MenuItem>
                    ))}
                </Select>
                </Grid>
                
            <Typography className="form-label">Completed?</Typography>
            <Grid item xs={12}>
              {/* <Select
                className="custom-form-selection-outline"
                labelId="single-select-outlined-label"
                id="single-select-outlined"
                style={props.borderClass}
                value={status}
                onChange={handleStatusChange}
                label="Status"
                name="status"
              >
                {statusOptions.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select> */}
              <Checkbox
            checked={status}
            onChange={handleStatusChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            </Grid>
            <Button
              className= "orange"
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "15px", background: "#336EF1", color:"white" }}
              sx = {{width: "100%", color: 'success'}}
            >
              Add
            </Button>
                </Grid>

                </form>
            </div>

        </Container>
    )



}