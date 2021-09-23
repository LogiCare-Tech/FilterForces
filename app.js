const express = require('express')

const cors = require('cors')



const mongoose = require('mongoose')

const morgan = require('morgan')

const cookieParser = require('cookie-parser')

const path = require('path')



const app = express()

const middleware = require('./utils/middleware')

const dotenv = require('dotenv')

const config = require('./utils/config')

//Routers


const VisualizeRouter = require('./controllers/VisualizationCtrl')

const UserRouter = require('./controllers/userCtrl')

dotenv.config()


app.use(express.json())

app.use(cors({origin: '*'}))
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}
if(process.env.NODE_ENV === "production")
{
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })

}
app.use(cookieParser())

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  autoIndex: false

})
  .then(() => {
    console.log("Connected")
   
  })
  .catch((error) => {
    console.log({ error: error })
  })

 
 app.use("/api/Users", UserRouter)



 app.use("/api/Visualize", VisualizeRouter)
 
 app.use(middleware.errorHandler)
 
 const PORT = process.env.PORT || 3001
 app.listen(PORT, () =>{
     console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`)
 })