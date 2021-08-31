const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'
const config = require('../utils/config')
const MAILING_SERVICE_CLIENT_ID =  config.GOOGLE_CLIENT_ID
const MAILING_SERVICE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET
const MAILING_SERVICE_REFRESH_TOKEN = config.MAILING_SERVICE_REFRESH_TOKEN
const SENDER_EMAIL_ADDRESS = config.SENDER_EMAIL_ADDRESS
const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const sendEmail = (to, url,txt) => {
      oauth2Client.setCredentials({
          refresh_token: MAILING_SERVICE_REFRESH_TOKEN
      })

      const accessToken = oauth2Client.getAccessToken()
      const smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: SENDER_EMAIL_ADDRESS,
              clientId: MAILING_SERVICE_CLIENT_ID,
              clientSecret: MAILING_SERVICE_CLIENT_SECRET,
              refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
              accessToken
          }
      })
      const mailOptions = {
          from: SENDER_EMAIL_ADDRESS,
          to: to,
          subject: 'FilterForces',
          html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the FilterForces.</h2>
          <p>Congratulations! You're almost set to start using FilterForces✮Web Application.
              Just click the button below to validate your email address.
          </p>
          
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
      
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
      
          <div>${url}</div>
          </div>
          `
      }
      smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}
module.exports = sendEmail