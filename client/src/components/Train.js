import React, { useState } from 'react'
import axios from 'axios'
const Train = () => {
    const [handle, setHandle] = useState('')
    const [generalSet, setAcceptedList] = useState(null)
    const [startRange, setStartRange] = useState('')
    const [endRange, setEndRange] = useState('')
    const ChangeInputHandle = (event) => {

        setHandle(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Entered handle is ", handle)
        try {
            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`)
            console.log(response.data.result)
            const ProblemSetInfo = response.data.result.filter((info) => {
                return info.verdict === "OK"
            })
            setAcceptedList(ProblemSetInfo)

        }
        catch (error) {
            console.log(error)
        }

    }
    const handleEndRange=  (event) => {
         setEndRange(event.target.value)
    }
    const handleStartRange = (event) => {
        setStartRange(event.target.value)
    }
    const handleRangeSubmit = (event) => {
        event.preventDefault()
       
            console.log(startRange, " ", endRange)
        
    
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
                    <table class="ui celled table unstackable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><p>Loredsjdfsdfdsfdddddddddddddddddddd</p></td>
                                <td>Unknown</td>
                                <td class="negative">None</td>
                            </tr>
                            <tr class="positive">
                                <td>Jimmy</td>
                                <td><i class="icon checkmark"></i> Approved</td>
                                <td>None</td>
                            </tr>
                            <tr>
                                <td>Jamie</td>
                                <td>Unknown</td>
                                <td class="positive"><i class="icon close"></i> Requires call</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>
                            <tr class="negative">
                                <td>Jill</td>
                                <td>Unknown</td>
                                <td>None</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="controls">
                   <form onSubmit={handleRangeSubmit}>
                       <input value = {startRange} onChange = {handleStartRange}/>

                       <input value = {endRange} onChange = {handleEndRange}/>
                       <button>Submit</button>
                   </form>
                </div>
            </div>
        </div>
    )
}
export default Train