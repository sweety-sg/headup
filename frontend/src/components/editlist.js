import * as React from 'react';
import axios from "axios";
import Typography from '@mui/material/Typography';
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

export default function Editlist(props){
    const list = props.list
    const listId = props.list.id
    const listName = props.listName 
    const projectId = props.proj
    console.log(props.listName+"yoyo"+ props.list.id)
    const [formData, setFormData] = React.useState({
        name: listName,
        project : projectId
      });

    const [status, setStatus] = React.useState("");

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      };

    const handleStatusChange = (event, data) => {
        setStatus(event.target.value)
    }
    const statusOptions = [
        "To be started",
        "In-Progress",
        "Completed",
      ];

    var csrf = Cookies.get("csrftoken");
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            name : formData.name,
            status : status,
            project : formData.project,
        }
        axios
          .put("http://127.0.0.1:3000/headup/list/"+ listId+"/", data, {
            headers: { "Content-Type": "application/json" ,  "X-CSRFToken": csrf},  params: {withCredentials : true}
          })
          .then((res) => {
            console.log(res);
            console.log("updated list");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            console.log("can't post form");
          });
      };

    React.useEffect(()=>{

    }, []);

    return(
        <Container component="main" maxWidth="xs" >
            <div style={{  padding: "5px 5px", outline: "10px solid #e6e6e6e"}}>
            {/* <Paper className=".MuiPaper-outlined" sx={{ width: 10 }}> */}
                <form onSubmit={handleFormSubmit} noValidate>
                <Grid container spacing={2}>
                    <Typography className="form-label">Name</Typography>
                    <Grid
                    item
                    xs={12}
                    className="custom-form-outline"
                    style={props.borderClass}
                    >
                    <TextField
                        name="name"
                        fullWidth
                        id="name"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
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
            <Button
              className= "orange"
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "15px", background: "#336EF1", color:"white" }}
              sx = {{width: "100%", color: 'success'}}
            >
              Update
            </Button>
                </Grid>

                </form>
            </div>

        </Container>
    )



}