
import React, { useState } from 'react'
import axios from 'axios'


import Histogram from './Histogram_RatingWise'
import Doughnuts from './Doughnut'


const PersonalStats = () => {
  const [username,setUsername] = useState('')

  const [RatingInfo, setRatingInfo] = useState([])
  const [TopicInfo, setTopicInfo] = useState([])
  const [TypeInfo, setTypeInfo] = useState([])
  const [RatingWiseAvg, setRatingWiseAvg] = useState()
  const [TopicWiseAvg, setTopicWiseAvg] = useState()
  const [TypeWiseAvg, setTypeWiseAvg] = useState()
  const [notification, setNotification] = useState(null)
  const [show, setShow] = useState(0)
  const usernameChange = (e) => {
    setUsername(e.target.value)
  }
  const SendRequest = async () => {
    try {
      
      let RATING = []
      let TOPIC = []
      let TYPE = []

      /*
      @AvgRatingTime, AvgTopicTime, AvgTypeTime => map [key, value]
                            key => rating, topic,type
                            value => total time (adding time taken by each question)
      */
      let AvgRatingTime = new Map()
      let AvgTopicTime = new Map()
      let AvgTypeTime = new Map()
      try {


        let obj = {
          username
        }
        const getAccessToken = await axios.post('/api/Users/refresh_token')
      const { access_token } = getAccessToken.data
     
    
        var getVisualizationInfo = await fetch(`/api/Visualize/private`,
          {
            method: 'POST',
            headers: {
              'Authorization': access_token,
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(obj)
          })
    
        if (getVisualizationInfo.status === 400) {
        
          setTimeout(() => {
            setNotification('')
          }, 3500)
          setShow(0)
          getVisualizationInfo = await getVisualizationInfo.json()
          
          setNotification(getVisualizationInfo.msg)
        }
        else {
          setShow(1)
          getVisualizationInfo = await getVisualizationInfo.json()
          if (getVisualizationInfo) {
            
            for (let data of getVisualizationInfo.data) {
              
               if(!data)
               {
                   continue;
               }
              if (data.type) {
                if (AvgTypeTime.get(data.type)) {
                  let count = Number(AvgTypeTime.get(data.type)[1]) + 1
                  let AvgTime = Number(AvgTypeTime.get(data.type)[0]) + Number(data.time)
                  AvgTypeTime.set(data.type, [AvgTime, count])
                }
                else {
                  AvgTypeTime.set(data.type, [Number(data.time), 1])
                }
              }
              if (data.topic) {
                for (let topic of data.topic) {
                  if (AvgTopicTime.get(topic)) {
                    let count = Number(AvgTopicTime.get(topic)[1]) + 1
                    let AvgTime = Number(AvgTopicTime.get(topic)[0]) + Number(data.time)
                    AvgTopicTime.set(topic, [AvgTime, count])
    
                  }
                  else {
                    AvgTopicTime.set(topic, [Number(data.time), 1])
                  }
                }
              }
              if (data.rating) {
                if (AvgRatingTime.get(data.rating)) {
                  let count = Number(AvgRatingTime.get(data.rating)[1]) + 1
                  let AvgTime = Number(AvgRatingTime.get(data.rating)[0]) + Number(data.time)
    
                  AvgRatingTime.set(data.rating, [AvgTime, count])
    
                }
                else {
    
                  AvgRatingTime.set(data.rating, [Number(data.time), 1])
    
                }
              }
    
            }
    
          }
        }
    
    
    
    
    
    
    
        
      }
      catch (Err) {
        
        setTimeout(() => {
          setNotification('')
        }, 2500)
        setShow(0)
        setNotification("Download our extension to visualize in-depth");
      }

    
  

    
      RATING = [...AvgRatingTime.keys()]
      TOPIC = [...AvgTopicTime.keys()]
      TYPE = [...AvgTypeTime.keys()]
      RATING.sort(function (a, b) {
        return a - b;
      });


 
     
      setTopicWiseAvg(AvgTopicTime)
      setRatingWiseAvg(AvgRatingTime)
      setTypeWiseAvg(AvgTypeTime)
   
      setRatingInfo([...RATING])
      setTopicInfo([...TOPIC])
      setTypeInfo([...TYPE])


    } catch (err) {

      setTimeout(() => {
        setNotification('')
      }, 2500)
      setNotification(err)
    }
  }
  const usernameSubmit = (e) => {
    e.preventDefault()
    
    SendRequest()
  }
  return (
    <div className="VizContainer">
      {
      notification &&
        <div className="Notification" style={{ backgroundColor: "red" }}>
          <h3> {notification}</h3>
        </div>
      }

      {
      
      show === 0 &&
        <>
          <h1 style={{ textAlign: 'center', marginTop: '7%', position: "relative" }}>Enter your FilterForces Username</h1>
          <form onSubmit={usernameSubmit} className="INPUT">

            <div className="ui action input ">
              <input

                type="text"
                value={username}
                placeholder="Please enter your username"
                onChange={(e) => usernameChange(e)} />
              <button className="ui icon button">
                <i className="arrow right icon" />
              </button>

            </div>
          </form>

        </>





      }
      {

            
          show === 1 &&
          <>
           
           
            <Histogram
              RatingInfo={RatingInfo}
              RatingWiseAvg={RatingWiseAvg}
              TypeInfo={TypeInfo}
              TypeWiseAvg={TypeWiseAvg}
            />
            <Doughnuts
              TopicInfo={TopicInfo}
              TopicWiseAvg={TopicWiseAvg}

            />

          </>
          
         
      }
     
    </div>
  )
}
export default PersonalStats