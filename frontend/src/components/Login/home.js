
import React from 'react';
// import randomstring from 'randomstring';

function Home(){
    // var str = randomstring.generate()
    let auth_params={
        "CLIENT_ID":"ZVHaqsAlP5pA3vvVUJY2X0rd0tZM1h2JUg0qE2s7",
        "REDIRECT_URI":"http://127.0.0.1:3000/login",
        "STATE_STRING":'random_string',
    }
    const handleButtonClick = (e) => {
        e.preventDefault();
        window.location.href = "https://channeli.in/oauth/authorise/?client_id="+auth_params.CLIENT_ID+"&redirect_uri="+auth_params.REDIRECT_URI+"&state="+auth_params.STATE_STRING;
    }
    
    return(
        <div>

            <button onClick={handleButtonClick}>Login</button>
        </div>
    );
}
export default Home;