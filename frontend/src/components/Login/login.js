import React from 'react';
import {render} from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn : false
        }
    }

    renderRedirect = () => {
        if(this.state.loggedIn===true){
            return <Redirect to={{pathname:'../dashboard'}}/>
        }
    }

    async componentDidMount(){
        // eslint-disable-next-line no-restricted-globals
        const params= new URLSearchParams(location.search);
        const auth= params.get("code");
        console.log(auth)
        await axios({url:'http://127.0.0.1:8000/headup/oauth' ,method:'GET', params: {code:auth} , withCredentials:true} )
            .then((response)=>{
                console.log(response);
                console.log("ok");
                
                
            })
            // .catch((err) => {
            //     console.log(err);
            // });
        
        await this.setState({loggedIn:true});
    }

    render(){
        return(
            <div>
                {this.renderRedirect()}
                Logging in....
            </div>
        )
    }
}
 export default Login;