import React, { useEffect, useState } from 'react'
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
    const [personalHandle, setPersonalHandle] = useState('')
    const [personalPsetOnCf, setPersonalPsetOnCf] = useState([])
    const [allPset, setAllPset] = useState([])
    const [allTags, setAllTags] = useState([])
    useEffect(() => {
        const find = async () => {

            const response = await axios.get(`https://codeforces.com/api/problemset.problems`)
            const AllTags = []

            let sets = response.data.result.problems
            for (let i = 0; i < sets.length; i++) {
                for (let j = 0; j < sets[i].tags.length; j++) {
                    if (!AllTags.includes(sets[i].tags[j])) {
                        AllTags.push(sets[i].tags[j])
                    }
                }
            }


            setAllTags([...AllTags])
            setAllPset([...response.data.result.problemStatistics])
        }
        find()
    }, [])
    const ChangeInputHandle = (event) => {

        setHandle(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()


        try {
            var handles = [...listHandle]
            if (handles.includes(handle) === false) {
                handles.push(handle)
                var alreadyExistingProblemSet = new Set()
                const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=20`)

                const ProblemSetInfo = response.data.result.filter((info) => {
                    return info.verdict === "OK"
                })



                for (let i = 0; i < ProblemSetInfo.length; i++) {
                    alreadyExistingProblemSet.add(ProblemSetInfo[i])
                }

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

        const data = names.map((info) => {

            return (
                <div>
                    <p>{info}</p>
                </div>

            )
        })

        return data
        //return data
    }
    const handleList = (generalSet) => (
        generalSet ? <Display info={updatedSet} personalInfo={personalPsetOnCf} stats={allPset} tags={allTags} />
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
    const handlePersonalHandle = (event) => {
        setPersonalHandle(event.target.value)
    }
    const handleAdminUsername = async (event) => {
        event.preventDefault()

        const response = await axios.get(`https://codeforces.com/api/user.status?handle=${personalHandle}&from=1&count=10000`)
        //response.data.result


        setPersonalPsetOnCf([...response.data.result])

    }
    return (
        <div>


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
                    <h1>Enter the handle</h1>
                    <form onSubmit={handleSubmit} className="handleInput">
                        <input value={handle} type="text" onChange={ChangeInputHandle} />
                        <br />
                        <button type="submit">Add Handle</button>
                        <div className="addedHandles">
                            {
                                listHandle.map((info, index) => {
                                    return (
                                        <div className="tagFilterName" key={index}><h4>{info}<span className="collapse" onClick={() => handleRemovePerson(info)}>❌</span></h4></div>
                                    )
                                })
                            }

                        </div>

                    </form>
                    <i className="user secret icon"></i><span>Enter your handle</span>
                    <input type="text" value={personalHandle} onChange={(event) => handlePersonalHandle(event)} />
                    <button onClick={(event) => handleAdminUsername(event)}>Apply</button>
                    <div>
                        {
                           allTags.map((i,index) => <p key = {index}>{i}</p>)
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Train