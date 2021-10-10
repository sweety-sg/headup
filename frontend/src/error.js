import { Button, Link } from '@material-ui/core';
import React from 'react';
import './components/style.css'


export default function Error(){
    return(
        // <>
        <div className="not-found" style={{margin:"auto", width:"500px", marginTop:"100px"}}>
        <img
          src="https://i.pinimg.com/564x/a9/59/a7/a959a73fcb2cb2d0b865a89450a74043.jpg"
          
          alt="error"
          className="not-found-illustration vert-move"
        />
        <div className="not-found-title">ERROR!</div>
        <div className="font-head">
          Are you disabled? 
          <br />
          The page you were trying to open isn't available to you at the moment. You either are disabled or there is some problem on our side.
          <br />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            margin: "20px 0",
          }}
        >
          <a href="http://127.0.0.1:3000/">
            <Button className="btn-filled btn-filled-blue">Back To Login Page</Button>
          </a>
        </div>
      </div>
    //   </>
    )
}