import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
const responseSuccessGoogle = (response) => {
    console.log(response)
    axios({
        method: "POST",
        url: "http://localhost:3001/api/auth/google",
        data: {
            tokenId: response.tokenId
        }
    })
    .then(response => {
       // API response
        console.log("api bataya ",response)
    })
    .catch(error=>{
        console.log("Error hogaya ",error)
    })
        
    
}
const responseErrorGoogle = (response) => {
       console.log(response)
}
const Login = () => {
    return (
        <div>
            <br />
            <br />
            <br />
            <h1>/LOGIN</h1>
            <GoogleLogin
                clientId="605738722309-uf8r0ll61ff54j9mtrhhhq15i1v8qpju.apps.googleusercontent.com"
                buttonText="Login with GOOGLE"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
export default Login
// ZRR5np-UYNqnnQp2kZ-WzHY1