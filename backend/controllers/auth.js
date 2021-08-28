const express = require('express')
const AuthRouter = express.Router()
const {OAuth2Client, UserRefreshClient} = require('google-auth-library')
const dotenv = require('dotenv')
dotenv.config()
const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`)
AuthRouter.post('/', (request, response) => {
   
    const {tokenId} = request.body
    client.verifyIdToken({idToken: tokenId, audience: `${process.env.GOOGLE_CLIENT_ID}`})
    .then(response => {
        const {email_verified, name, email} = response.payload
        // console.log(response.payload)
        if(email_verified)
        {
           console.log(response.payload.given_name)
        }
    })
})
module.exports = AuthRouter