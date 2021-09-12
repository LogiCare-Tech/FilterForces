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
  const [RatingWiseAvg, setRatingWiseAvg] = useState()
  const handleChange = (e) => {
    setHandle(e.target.value)
  }
  const SendRequest = async (data) => {
    try {
      const URL = `https://codeforces.com/api/user.status?handle=${data}`

      let response = await axios.get(`https://codeforces.com/api/user.status?handle=${data}`)

      let Description = new Map()
      let YEAR = new Set()
      let RATING = []
      let AvgRatingTime = new Map()
      for (let data of response.data.result) {

        //Collecting the Year 
        YEAR.add(Number(new Date(data.creationTimeSeconds * 1000).getFullYear()))

      

        if (data.author.participantType === "CONTESTANT") {
          if (AvgRatingTime.get(data.problem.rating)) {
            let count = AvgRatingTime.get(data.problem.rating)[1] + 1
            let AvgTime = AvgRatingTime.get(data.problem.rating)[0]
            AvgTime = Math.ceil((AvgTime + data.relativeTimeSeconds) / count)

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
        console.log(Key_Format)
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
      RATING =[...AvgRatingTime.keys()] 
    RATING.sort(function(a, b) {
        return a - b;
      });
      
      
      
      setOptionWise([...optionHolder])
      setDateWise(Description)
      setRatingWiseAvg(AvgRatingTime)
      setYearInfo([...YEAR])
      setRatingInfo([...RATING])

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
        <div className="INPUT">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={HANDLE}
              onChange={(e) => handleChange(e)} />
          </form>
        </div>
      }
      {
        YearInfo.length > 0 &&
        <>
          <Histogram
          RatingInfo={RatingInfo}
          RatingWiseAvg = {RatingWiseAvg}
          />
          <Doughnuts
          RatingInfo={RatingInfo}
          RatingWiseAvg = {RatingWiseAvg}
          />
          <HeatMap
            DateWise={DateWise}
            YearInfo={YearInfo}
            optionWise={optionWise}
             />
        </>
      }
    </div>
  )
}
export default Resume