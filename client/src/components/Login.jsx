import React from 'react'
import GoogleLogin from 'react-google-login'
const responseSuccessGoogle = (response) => {
    console.log(response)
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
            />,
        </div>
    )
}
export default Login
// ZRR5np-UYNqnnQp2kZ-WzHY1