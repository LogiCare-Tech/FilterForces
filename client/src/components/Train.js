import React, { useState } from 'react'
import axios from 'axios'
import Display from './DisplayList'

const Train = () => {
    const [handle, setHandle] = useState('')

    const [listHandle, setListHandle] = useState([])

    //generalSet stores the questions which are obtained from initial api get request
    const [generalSet, setAcceptedList] = useState([])

    //updatedSet stores the questions which are sorted by giving rating range
    const [updatedSet, setUpdate] = useState([])
    const [startRange, setStartRange] = useState('')
    const [endRange, setEndRange] = useState('')
    const [allHandlePsetInfo, setPsetInfo] = useState({})
    const ChangeInputHandle = (event) => {

        setHandle(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Entered handle is ", handle)

        try {
            var handles = [...listHandle]
            if (handles.includes(handle) === false) {
                handles.push(handle)
                var alreadyExistingProblemSet = new Set()
                const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=50`)
                console.log(response.data.result)
                const ProblemSetInfo = response.data.result.filter((info) => {
                    return info.verdict === "OK"
                })


                console.log(ProblemSetInfo)
                for (let i = 0; i < ProblemSetInfo.length; i++) {
                    alreadyExistingProblemSet.add(ProblemSetInfo[i])
                }
                // var obj = { key1: "value1", key2: "value2" };
                // var pair = { key3: "value3" };
                // obj = { ...obj, ...pair };
                var newGuy = {
                    ...allHandlePsetInfo
                }
                newGuy[handle] = [...alreadyExistingProblemSet]
                setPsetInfo(newGuy)
                for (let i = 0; i < generalSet.length; i++) {
                    alreadyExistingProblemSet.add(generalSet[i])
                }
                setListHandle(handles)
                setAcceptedList([...alreadyExistingProblemSet])
                setUpdate([...alreadyExistingProblemSet])
            }
            else {
                alert("Handle is already added")
            }

        }
        catch (error) {
            alert("Please enter the valid handle or wait for the codeforces api to accept the request")
            console.log(error)
        }

    }
    const displayHandleNames = (names) => {
        console.log("handles are ", names)
        const data = names.map((info) => {
            console.log(info)
            return (
                <div>
                    <p>{info}</p>
                </div>

            )
        })
        console.log("here ", data)
        return data
        //return data
    }
    const handleList = (generalSet) => (
        generalSet ? <Display info={updatedSet} />
            : null
    )
    const handleEndRange = (event) => {
        setEndRange(event.target.value)
    }
    const handleStartRange = (event) => {
        setStartRange(event.target.value)
    }
    const handleRangeSubmit = (event) => {
        event.preventDefault()

        console.log(startRange, " ", endRange)
        if (updatedSet.length) {
            if (startRange !== '' && endRange !== '') {
                const filterSet = generalSet.filter((info) => info.problem.rating >= startRange && info.problem.rating <= endRange)

                setUpdate(filterSet)
            }
            else {
                alert("Please enter the valid range")
            }

        }
        else {
            alert("Please add handles to sort the questions")
        }

    }
    const clearRange = () => {
        setStartRange('')
        setEndRange('')
        setUpdate(generalSet)
    }

    const handleRemovePerson = (info) => {

        const data = [...listHandle]
        const filter = data.filter((name) => name !== info)
        const updatedObject = allHandlePsetInfo

        delete updatedObject[info]


        const list = filter.map((handleName) => allHandlePsetInfo[handleName].map(info => info))
        if (list.length) {
            setAcceptedList(list[0])
            setUpdate(list[0])
        }
        else {
            setAcceptedList([])
            setUpdate([])
        }
        setPsetInfo(updatedObject)

        setListHandle(filter)
    }
    return (
        <div>

            <h1>Enter the handle</h1>
            <form onSubmit={handleSubmit} className="handleInput">
                <input value={handle} type="text" onChange={ChangeInputHandle} />
                <br />
                <button type="submit">Add Handle</button>
                <div className="addedHandles">
                    {
                        listHandle.map((info) => {
                            return (
                                <div className="tagFilterName"><h4>{info}<span className="collapse" onClick={() => handleRemovePerson(info)}>❌</span></h4></div>
                            )
                        })
                    }

                </div>

            </form>
            <button>Apply</button>
            <div className="content-problemset">
                <div className="pset">
                    {
                        handleList(updatedSet)
                    }

                </div>

                <div className="controls">
                    <form onSubmit={handleRangeSubmit}>
                        <input value={startRange} onChange={handleStartRange} />

                        <input value={endRange} onChange={handleEndRange} />
                        <button>Submit</button>

                    </form>
                    <button onClick={clearRange}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default Train