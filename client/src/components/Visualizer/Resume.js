import React, { useState } from 'react'
import axios from 'axios'

import HeatMap from './Heatmap'


const Resume = () => {
  const [HANDLE, setHandle] = useState('')
  const [DateWise, setDateWise] = useState()
  const [YearInfo, setYearInfo] = useState([])
  const [optionWise, setOptionWise] = useState([])
  const handleChange = (e) => {
    setHandle(e.target.value)
  }
  const SendRequest = async (data) => {
    try {
      const URL = `https://codeforces.com/api/user.status?handle=${data}`
      console.log(URL)
      let response = await axios.get(`https://codeforces.com/api/user.status?handle=${data}`)

      let Description = new Map()
      let YEAR = new Set()
      for (let data of response.data.result) {
        YEAR.add(Number(new Date(data.creationTimeSeconds * 1000).getFullYear()))

        let time = new Date(data.creationTimeSeconds * 1000)
        let Key_Format =String(time.getFullYear())+"-"+  String(time.getMonth() + 1) + "-"+ String(time.getDate())
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
      console.log(Description)
      setOptionWise([...optionHolder])
      setDateWise(Description)
      setYearInfo([...YEAR])

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
        <HeatMap DateWise={DateWise} YearInfo={YearInfo} optionWise={optionWise} />
      }
    </div>
  )
}
export default Resume