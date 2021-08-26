const dotenv = require('dotenv')
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI

const PORT = 3001
const object = {
    MONGODB_URI,
    PORT
}
module.exports = object