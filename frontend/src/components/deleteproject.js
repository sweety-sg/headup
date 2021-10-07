import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from 'js-cookie';
import { withRouter, Redirect } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
const DeleteProject= (props)=> {
    const id = props.id;
    console.log("hi there")
    function handleDeleteEvent() {
        axios
            .delete("http://127.0.0.1:3000/headup/project/"+ id +"/", {
                headers: {"X-CSRFToken":Cookies.get('csrftoken') },
                params: {withCredentials : true}
            })
            .then((response)=>{
                console.log(response);
                window.location.reload();
            })
            .catch((err) => {
                console.log("uff")
                console.log(err);
            });
    };
    return(
        handleDeleteEvent()
    )
    
}
export default DeleteProject;