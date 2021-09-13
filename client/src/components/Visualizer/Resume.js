import React, { useState } from 'react'
import axios from 'axios'

import HeatMap from './Heatmap'
import Histogram from './Histogram_RatingWise'
import Doughnuts from './Doughnut'

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
      let AvgRatingTime = new Map()
      let AvgTopicTime = new Map()
      let AvgTypeTime = new Map()
      for (let data of response.data.result) {

        //Collecting the Year 
        YEAR.add(Number(new Date(data.creationTimeSeconds * 1000).getFullYear()))



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
            MAP  [key, value], key = > "YY-MM-DD" @String
                               value => [{problem info1}, {problem info2}] @Array
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
      alert("Codeforces api Failed to fetch the handle information")
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    SendRequest(HANDLE)
  }
  return (
    <div>
      {
        YearInfo.length === 0 &&
      
      <>
      <h1 style = {{textAlign: 'center',marginTop: '10%'}}>Enter the Codeforces Handle</h1>
        <form onSubmit = {handleSubmit} className= "INPUT">
         
         <div class="ui action input ">
           
         
        
           <input
         
            type="text"
            value={HANDLE}
             placeholder="Errichto"
             onChange={(e) => handleChange(e)}/>
           <button class ="ui icon button">
           <i class ="arrow right icon"/>
           </button>
           
         </div>
         </form>
      </>
    

      }
      {
        YearInfo.length > 0 &&
        <>
          <HeatMap
            DateWise={DateWise}
            YearInfo={YearInfo}
            optionWise={optionWise}
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
      }
    </div>
  )
}
export default Resume