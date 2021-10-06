// class Lists(models.Model):
//     # id = models.OneToOneField('Project', models.DO_NOTHING, db_column='id', primary_key=True)
//     id = models.AutoField(primary_key=True)
//     name = models.CharField(max_length=255, blank=True, null=True)
//     # project_id = models.IntegerField(db_column='Project_id', blank=True, null=True)  # Field name made lowercase.
//     project = models.ForeignKey(to=Project, on_delete=models.CASCADE, related_name='project_l')
//     members = models.ManyToManyField(User, related_name='members')
//     status = models.CharField(max_length=15, blank=True, null=True)
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

export default function Addlist(props){
    const projectId = props.projectId
    const [formData, setFormData] = React.useState({
        name: "",
        project : projectId,
      });
    // const [description, setDescription] = React.useState("");
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
          .post("http://127.0.0.1:3000/headup/list/", data, {
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
              Add
            </Button>
                </Grid>

                </form>
            </div>

        </Container>
    )



}