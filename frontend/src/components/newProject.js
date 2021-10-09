import React, { useEffect } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { Paper } from "@material-ui/core";
import Cookies from 'js-cookie';
import Datetime from 'react-datetime';
import { Editor } from '@tinymce/tinymce-react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import "./components.css";
// Axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
const NewProject = (props)=> {
    const [formData, setFormData] = React.useState({
        name: "",
        
      });
    var today = new Date(),
    date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()+ ' ' + today.getHours() + ':' + today.getMinutes();
    // console.log(today)
    // console.log(date)
    const [wiki, setWiki] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [start_date, setStart_date] = React.useState("2021-09-04T22:52:11Z");
    const [when, setWhen] = React.useState("2021-09-04T22:52:11Z");
    const [members, setMembers] = React.useState([]);
    const [project_admins, setProject_admins] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [membersd, setMembersd] = React.useState([]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      };

    const handleStatusChange = (event, data) => {
        setStatus(event.target.value);   
    }

    const handleMembersChange = (e) => {
        setMembers(e.target.value);
        console.log(members)
      };

    const handleProjAdminsChange = (e) => {
        setProject_admins(e.target.value);
        console.log(project_admins)
    }

    const handleWikiChange = (content, editor) => {
        setWiki(content);
      };

    const handleStartChange = (event, data) => setStart_date(data.value);
    const handleWhenChange = (event, data) => setWhen(data.value);

    const statusOptions = [
        "To be started",
        "In-Progress",
        "Completed",
      ];

    async function fetchUsers() {
        axios
            .get('http://127.0.0.1:3000/headup/user/')
            .then((response) => {
                console.log("entered");
                console.log(response.data.results);
                setUsers(response.data.results);
                console.log("fetched users");
            })
            .catch((error) => console.log(error + "uff"));
    }
    // function Memberdetails() {
    //     {members.map(function(member, index){
    //         {users.map((user) => (
    //             if(user.id==member){
    //                 membersd.append(user)
    //             }
    //         ))}
            
    //       })}

    // }
    console.log( Cookies.get("csrftoken"))
    var csrf = Cookies.get("csrftoken");
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData();
        // data.append("name", formData.name);
        // data.append("wiki", wiki);
        // data.append("project_admins", project_admins);
        // data.append("status", status);
        // data.append("members", members);
        // data.append("start_date", start_date);
        // data.append("when",when);
        const data = {
            name : formData.name,
            wiki : wiki,
            start_date : "2021-09-04T22:52:11Z" ,
            when : "2021-09-04T22:52:11Z",
            status : status,
            members : members,
            project_admins : project_admins,
            // creator: request.user
        }
        axios
          .post("http://127.0.0.1:3000/headup/project/", data, {
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
        fetchUsers();

    }, []);

    const allMembers = users.map((user)=>({
        key : user.id,
        value : user.id,
        label : user.full_name,
        text : user.full_name
    }))
    console.log(users)
    console.log(members)
    return(
        
        <Container component="main" maxWidth="xs" >
        
            <div style={{ margin: "10px 5px" , padding: "10px 5px"}}>
            
            {/* <Paper className=".MuiPaper-outlined" sx={{ width: 10 }}> */}
                <form onSubmit={handleFormSubmit} noValidate>
                <Grid container spacing={2}>
                    <Typography className="form-label">Project Name</Typography>
                    <Grid
                    item
                    xs={12}
                    className="custom-form-outline"
                    style={props.borderClass}
                    >
                    <TextField
                        name="name"
                        fullWidth
                        id="projectname"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
                    </Grid>

                    <Typography className="form-label">Wiki</Typography>
                    <Grid
                    item
                    xs={12}
                    style={{
                        ...props.borderClass,
                        padding: "0",
                        borderRadius: "4px",
                        margin: "10px",
                    }}
                    >
                    {/* <textarea 
                        name="wiki"
                        style={{ minHeight: 100 , width: "100%"}}
                        id="projectwiki"
                        value={wiki}
                        onChange={handleWikiChange}> </textarea> */}
                        <Editor
                  value={wiki}
                  init={{
                    icons: "thin",
                    height: 280,
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
                  onEditorChange={handleWikiChange}
                />
                </Grid>

                <Typography className="form-label">Members</Typography>
                <Grid item xs={12}>
                <Select
                    className="custom-form-selection-outline"
                    labelId="mutiple-chip-label"
                    id="mutiple-chip"
                    style={props.borderClass}
                    style={{  width: "100%"}}
                    multiple
                    value={members}
                    onChange={handleMembersChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                        <Chip
                            key={value}
                            label={
                            users.filter((user, index) => user.id == value)[0]
                                .full_name
                            }
                            style={{ margin: "10px", borderRadius: "5px" }}
                        />
                        ))}
                    </div>
                    )}
                >
                    {users.map((user) => (
                    <MenuItem key={user.full_name} value={user.id}>
                        {user.full_name}
                    </MenuItem>
                    ))}
                </Select>
                </Grid>
                <Typography className="form-label">Project Admins</Typography>
                <Grid item xs={12}>
                <Select
                    className="custom-form-selection-outline"
                    labelId="mutiple-chip-label"
                    id="mutiple-chip"
                    style={props.borderClass}
                    style={{  width: "100%"}}
                    multiple
                    value={project_admins}
                    onChange={handleProjAdminsChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                        <Chip
                            key={value}
                            label={
                            users.filter((user, index) => user.id == value)[0]
                                .full_name
                            }
                            style={{ margin: "10px", borderRadius: "5px" }}
                        />
                        ))}
                    </div>
                    )}
                >
                    {/* {members.map((user) => (
                        users.map(({u})=>{
                            if(u.id == user.id){
                                <MenuItem key={u.full_name} value={user.id}>
                                {u.full_name}
                                </MenuItem>
                            }   
                        })
                    
                    ))} */}
                    {users.map((user) => (
                    <MenuItem key={user.full_name} value={user.id}>
                        {user.full_name}
                    </MenuItem>
                    ))}
                </Select>
                </Grid>
            <Typography className="form-label">Status</Typography>
            <Grid item xs={12}>
              <Select
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
              </Select>
            </Grid>
            <Typography className="form-label">Due-Date</Typography>
            <Grid>
                <Datetime
                    placeholder='Due Date'
                    name='when'
                    value = {when}
                    
                    timeFormat = {true}
                    onChange={handleWhenChange}
                        />
            </Grid>
            <Button
              className= "orange"
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "15px", background: "#336EF1", color:"white" }}
              sx = {{width: "100%", color: 'success',}}
            >
              Create Project
            </Button>
                </Grid>

                </form>
                {/* </Paper> */}
            </div>

        </Container>
        

    )



    
    
}
export default NewProject;