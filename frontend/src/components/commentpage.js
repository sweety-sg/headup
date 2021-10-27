import React from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import './style.css';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import { Popper } from '@mui/material';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Comment from './comment';
import SendIcon from '@mui/icons-material/Send';

const CommentPage = (props) => {
    const id = props.id;
    const userId = props.userId;
    
    // console.log(name);
    
    const [prevComments, setPrevComments] = React.useState([]);
    const [currComment, setCurrComment] = React.useState('');
    const [socket, setSocket] = React.useState();
    const [open, setOpen] = React.useState(false);
    var data = 'abc';

    
    const establishConnection = () => {
        const chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/comments/'+ id + '/');
        setSocket(chatSocket)
        chatSocket.onopen = () => {
            console.log("Websocket Connection established");
            console.log(props.userId+"ok");
        };
        fetchPrevComments()
        
        
    }

    function fetchPrevComments() {
        axios
            .get('http://127.0.0.1:3000/headup/card/'+id+'/comments', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
            .then((response) => {
                setPrevComments(response.data)
                setScroll_Bottom()
            })
            .catch((error) => console.log(error));
    } 

    function setScroll_Bottom() {
        var objDiv = document.getElementById("comment-box-comments");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    const disconnectSocket = () => {
        socket.close();
        socket.onclose = () => {
            console.log("Server disconnected");
        };
    }
 
    if(open===true){
        socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            var val = prevComments;
            val.push(data['message']);
            setPrevComments([...val])
            setScroll_Bottom()
        };
    }

    const sendComment = () => {
        if(currComment===''){
            return;
        }
       
        const data = {
            message : {
                text : currComment,
                sender : userId,
                // time : new Date(),
                card : id,
            }   
        };
        socket.send(JSON.stringify(data));
        console.log("sending: " + data.message.text+ data.message.sender +data.message.card);
        setCurrComment('')
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        
      if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("btn").click()
        // sendComment();
        // this.btn.click();
      }
    };
    
    return(
        <>
        {/* <Button onClick={()=> {setOpen(true);}}/> */}
        {/* <Modal
                className='card-popup-modal-comments'
                onClose={() => {setOpen(false);disconnectSocket()}}
                onOpen={() => {setOpen(true);establishConnection()}}
                open={open}
                trigger={<Button icon='comments' floated='right' color='blue' size='large' ></Button>}
        > */}
        <Button variant="text" onClick={() => {setOpen(true);establishConnection()}}>View all comments</Button>
        <div className='comment-box-comments' id='comment-box-comments' >
            {   
                (prevComments==='')?("hi"):(
                prevComments.map(function(comment,index){
                    return(

                        <Comment key={index} text= {comment.text} name={comment.sender.full_name} className={(comment.sender.id===userId)?('flex-div-comment-right'):('flex-div-comment-left')} />

                )}))
            }
        </div>
        <KeyboardArrowDownIcon 
        onClick={()=>setScroll_Bottom()}
    
        />
        <div>
        <form>
            <TextField
                value = {currComment}
                onChange={ (e) => setCurrComment(e.target.value)}
                onKeyPress={handleKeypress}
            />
                <Button variant="outlined" id="btn" onClick={sendComment} labelPosition='left' icon='edit' primary endIcon={<SendIcon />} style={{margin:"0.5rem"}} > Send </Button>
            </form>
        </div>
        {/* </Modal> */}
        </>
    )


}

export default CommentPage;