const http = require('http')
const dotenv = require('dotenv')
const app = require('./app.js')
const server = http.createServer(app)

dotenv.config()
const PORT = process.env.PORT || 3001
server.listen(PORT, () =>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`)
})