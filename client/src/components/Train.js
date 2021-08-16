import React, { useState } from 'react'
import axios from 'axios'
import Display from './DisplayList'
const Train = () => {
    const [handle, setHandle] = useState('')
    const [generalSet, setAcceptedList] = useState(null)
    const [updatedSet, setUpdate] = useState(null)
    const [startRange, setStartRange] = useState('')
    const [endRange, setEndRange] = useState('')
    const ChangeInputHandle = (event) => {

        setHandle(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Entered handle is ", handle)
        try {
            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=50`)
            console.log(response.data.result)
            const ProblemSetInfo = response.data.result.filter((info) => {
                return info.verdict === "OK"
            })
            console.log(ProblemSetInfo)
            setAcceptedList(ProblemSetInfo)
            setUpdate(ProblemSetInfo)

        }
        catch (error) {
            console.log(error)
        }

    }
    const handleList = (generalSet) => (
        generalSet ?  <Display info = {updatedSet}/> 
        : null
    )
    const handleEndRange=  (event) => {
         setEndRange(event.target.value)
    }
    const handleStartRange = (event) => {
        setStartRange(event.target.value)
    }
    const handleRangeSubmit = (event) => {
        event.preventDefault()
       
            console.log(startRange, " ", endRange)
        if(updatedSet.length)
        {
            if(startRange !== '' && endRange !== '')
            {
                const filterSet = generalSet.filter((info) => info.problem.rating >= startRange && info.problem.rating <= endRange)
            
                setUpdate(filterSet)
            }
            else{
                alert("Please enter the valid range")
            }
            
        }
        else{
            alert("Please add handles to sort the questions")
        }
    
    }
    const clearRange = () =>{
setStartRange('')
setEndRange('')
setUpdate(generalSet)
    }
    return (
        <div>
            <h1>Enter the handle</h1>
            <form onSubmit={handleSubmit} className="handleInput">
                <input value={handle}  type="text" onChange={ChangeInputHandle} />
                <br />
                <button type="submit">Add Handle</button>
            </form>
            <div className="content-problemset">
                <div className="pset">
               {
                  handleList(updatedSet)
               }
                   
                </div>

                <div className="controls">
                   <form onSubmit={handleRangeSubmit}>
                       <input value = {startRange} onChange = {handleStartRange}/>

                       <input value = {endRange} onChange = {handleEndRange}/>
                       <button>Submit</button>
                      
                   </form>
                   <button onClick = {clearRange}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default Train