import React from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import './style.css';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import { Popper } from '@mui/material';
import { TextField } from '@mui/material';
import './style.css';

const Comment = (props) => {
    const text = props.text
    const name = props.name
    console.log(name+"n")
    return(
        <div className="comm">
            <div className={(props.className=='flex-div-comment-right')?('cmt-right'):('cmt-left')}>
            <Typography variant="caption" color="text.secondary"> {name}</Typography>
            <div className={props.className}>
        <Typography variant="body1" className={(props.className=='flex-div-comment-right')?('right-text'):('left-text')} >
            {text}
        </Typography>
        </div>
        </div>
        </div>
    )

}
export default Comment;