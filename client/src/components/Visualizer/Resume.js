import React, { useState } from 'react'
import axios from 'axios'

import HeatMap from './Heatmap'
import Histogram from './Histogram_RatingWise'
import Doughnuts from './Doughnut'
import Overlay from './Overlay'

const Resume = () => {
  const [HANDLE, setHandle] = useState('')
  const [DateWise, setDateWise] = useState()
  const [YearInfo, setYearInfo] = useState([])
  const [optionWise, setOptionWise] = useState([])
  const [RatingInfo, setRatingInfo] = useState([])
  const [TopicInfo, setTopicInfo] = useState([])
  const [TypeInfo, setTypeInfo] = useState([])
  const [RatingWiseAvg, setRatingWiseAvg] = useState()
  const [TopicWiseAvg, setTopicWiseAvg] = useState()
  const [TypeWiseAvg, setTypeWiseAvg] = useState()
  const [date, setDate] = useState(null)
  const [notification, setNotification] = useState('')
  const [load, setLoad] = useState(0)
  const handleChange = (e) => {
    setHandle(e.target.value)
  }
  const SendRequest = async (data) => {
    try {


      let response = await axios.get(`https://codeforces.com/api/user.status?handle=${data}`)

      let Description = new Map()
      let YEAR = new Set()
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
          HANDLE
        }


        var getVisualizationInfo = await fetch(`/api/Visualize/please`,
          {
            method: 'POST',
            headers: {

              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(obj)
          })

        if (getVisualizationInfo.status === 400) {
          console.log(getVisualizationInfo)
          setTimeout(() => {
            setNotification('')
          }, 3500)

          setNotification("Only contest data will be visualized");
        }
        else {
          getVisualizationInfo = await getVisualizationInfo.json()
          if (getVisualizationInfo) {
            for (let data of getVisualizationInfo.data) {
               if(!data)
               {
                   break;
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
        console.log(Err)
        setTimeout(() => {
          setNotification('')
        }, 2500)
        setNotification("Download our extension to visualize in-depth");
      }


      for (let data of response.data.result) {

        //Collecting the Year 
        YEAR.add(Number(new Date(data.creationTimeSeconds * 1000).getFullYear()))


        //Collecting the time taken to solve the problems in contest 

        if (data.author.participantType === "CONTESTANT" && data.verdict === "OK") {
          for (let topic of data.problem.tags) {
            if (AvgTopicTime.get(topic)) {
              let count = Number(AvgTopicTime.get(topic)[1]) + 1
              let AvgTime = Number(AvgTopicTime.get(topic)[0]) + data.relativeTimeSeconds
              AvgTopicTime.set(topic, [AvgTime, count])

            }
            else {
              AvgTopicTime.set(topic, [data.relativeTimeSeconds, 1])
            }
          }


          if (AvgTypeTime.get(data.problem.index)) {
            let count = Number(AvgTypeTime.get(data.problem.index)[1]) + 1
            let AvgTime = Number(AvgTypeTime.get(data.problem.index)[0]) + data.relativeTimeSeconds
            AvgTypeTime.set(data.problem.index, [AvgTime, count])
          }
          else {
            AvgTypeTime.set(data.problem.index, [data.relativeTimeSeconds, 1])
          }

          if (AvgRatingTime.get(data.problem.rating)) {
            let count = Number(AvgRatingTime.get(data.problem.rating)[1]) + 1
            let AvgTime = Number(AvgRatingTime.get(data.problem.rating)[0]) + data.relativeTimeSeconds

            AvgRatingTime.set(data.problem.rating, [AvgTime, count])

          }
          else {

            AvgRatingTime.set(data.problem.rating, [data.relativeTimeSeconds, 1])

          }
        }







        /*
           Description    
            MAP  [key, value], key = > "YY-MM-DD" String
                               value => [{problem info1}, {problem info2}] Array
                               Storing datewise statistics
        */
        let time = new Date(data.creationTimeSeconds * 1000)
        let Key_Format = String(time.getFullYear()) + "-" + String(time.getMonth() + 1) + "-" + String(time.getDate())

        if (Description.get(Key_Format)) {
          Description.set(Key_Format, [...Description.get(Key_Format), data])
        }
        else {
          Description.set(Key_Format, [data])
        }

      }

      //This is used for heatmap
      let optionHolder = []
      for (let data of YEAR) {
        optionHolder.push({ value: data, label: data })
      }



      RATING = [...AvgRatingTime.keys()]
      TOPIC = [...AvgTopicTime.keys()]
      TYPE = [...AvgTypeTime.keys()]
      RATING.sort(function (a, b) {
        return a - b;
      });


      //optionWise is used for heatmap
      setOptionWise([...optionHolder])
      setDateWise(Description)
      setTopicWiseAvg(AvgTopicTime)
      setRatingWiseAvg(AvgRatingTime)
      setTypeWiseAvg(AvgTypeTime)
      setYearInfo([...YEAR])
      setRatingInfo([...RATING])
      setTopicInfo([...TOPIC])
      setTypeInfo([...TYPE])


    } catch (err) {

      setTimeout(() => {
        setNotification('')
      }, 2500)
      setNotification("Codeforces api Failed to fetch the handle information");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoad(1)
    SendRequest(HANDLE)
  }
  return (
    <div className="VizContainer">
      {notification.length > 0 &&
        <div className="Notification" style={{ backgroundColor: "red" }}>
          <h3> {notification}</h3>
        </div>
      }

      {
        YearInfo.length === 0 && load === 0 &&

        <>
          <h1 style={{ textAlign: 'center', marginTop: '7%', position: "relative" }}>Enter the Codeforces Handle</h1>
          <form onSubmit={handleSubmit} className="INPUT">

            <div className="ui action input ">



              <input

                type="text"
                value={HANDLE}
                placeholder="Errichto"
                onChange={(e) => handleChange(e)} />
              <button className="ui icon button">
                <i className="arrow right icon" />
              </button>

            </div>
          </form>

        </>





      }
      {

        YearInfo.length > 0 && date === null ?

          <>
            {load === 1 && setLoad(0)}
            <HeatMap
              DateWise={DateWise}
              YearInfo={YearInfo}
              optionWise={optionWise}
              setDate={setDate}
            />
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
          :
          YearInfo.length > 0 ?
            <Overlay date={date} setDate={setDate} DateWise={DateWise} />
            :
            null
      }
      {load === 1 &&

        <div className="ui active dimmer">
          <div className="ui medium text loader">Loading</div>
        </div>


      }

    </div>
  )
}
export default Resume