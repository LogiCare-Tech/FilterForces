const dotenv = require('dotenv')

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const PORT = 3001
const object = {
    MONGODB_URI,
    PORT,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
}
module.exports = object