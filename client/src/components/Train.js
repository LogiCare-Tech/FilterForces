import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Display from './DisplayList'

const Train = () => {
    const [handle, setHandle] = useState('')

    const [listHandle, setListHandle] = useState([])

    //generalSet stores the questions which are obtained from initial api get request
    const [generalSet, setAcceptedList] = useState([])

    //updatedSet stores the questions which are sorted by giving rating range
    const updatedSet = useRef([])
    
    const triggerRender = useRef(false)
    const [startRange, setStartRange] = useState(null)
    const [endRange, setEndRange] = useState(null)
    const [allHandlePsetInfo, setPsetInfo] = useState({})
    const [personalHandle, setPersonalHandle] = useState('')
    const [personalPsetOnCf, setPersonalPsetOnCf] = useState([])
    const [allPset, setAllPset] = useState([])
    const [allTags, setAllTags] = useState([])
    const [allLadder, setAllLadder] = useState([])
    const [ladderInputField, setLadderField] = useState('')
    const [currentLadder, setCurrentLadder] = useState([])
    const [currentRange, setCurrentRange] = useState([])



    //Universal pset which are filtered according to Personal Handle tags
    const [filterTagPset, setFilterTagPset] = useState([])



    useEffect(() => {
        const find = async () => {

            const response = await axios.get(`https://codeforces.com/api/problemset.problems`)
            const AllTags = []
            const AllLadder = []
            let sets = response.data.result.problems
            for (let i = 0; i < sets.length; i++) {
                for (let j = 0; j < sets[i].tags.length; j++) {
                    if (!AllTags.includes(sets[i].tags[j])) {
                        AllTags.push(sets[i].tags[j])
                    }

                }
                if (!AllLadder.includes(sets[i].index)) {
                    AllLadder.push(sets[i].index)
                }
            }

            setAllLadder([...AllLadder])
            setAllTags([...AllTags])

           
            setAllPset([...response.data.result.problemStatistics])
        }
        find()
    }, [])
    useEffect(() => {
        let mp1 = new Map()


        if (triggerRender.current == true) {

            for (let info of filterTagPset) {
                mp1.set(info, 0)
            }
             
            for (let info of filterTagPset) {

                if (info.rating >= currentRange[0] && info.rating <= currentRange[1]) {
                    mp1.set(info, mp1.get(info) + 1)
                    if(currentLadder.includes(info.index))
                    {
                        mp1.set(info, mp1.get(info) + 1)
                    }
                }



            }
            if(currentRange.length == 0)
            {
                for(let info of filterTagPset)
             {
                 
                if (currentLadder.includes(info.index)) {
                    mp1.set(info, mp1.get(info) + 1)
                   
                }
             }
            }
             

           
            let values = []
            for (let info of mp1.values()) {
                values.push(info)
            }
            let listToDisplay = []
            let maxVotes = Math.max(...values)
            //console.log("Max votes ", maxVotes)
            if(currentLadder.length || currentRange.length)
            {
                for (let info of mp1) {
                    // console.log("from heaven ",info)
                    if (maxVotes > 0 &&  mp1.get(info[0]) === maxVotes) {
                        //console.log("From heaven ", info)
                        listToDisplay.push(info[0])
                    }
                }
            }
            else{
                for (let info of mp1) {
                    // console.log("from heaven ",info)
                    if ( mp1.get(info[0]) === maxVotes) {
                        //console.log("From heaven ", info)
                        listToDisplay.push(info[0])
                    }
                }
            }
            
            // console.log("List to display ", listToDisplay)
            updatedSet.current = [...listToDisplay]
            triggerRender.current = false
            
            setAcceptedList([])
        }

    }, [filterTagPset, currentLadder, currentRange])
    const ChangeInputHandle = (event) => {

        setHandle(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("hi ", handle)

        try {
            triggerRender.current = true
            var handles = [...listHandle]
            if (handles.includes(handle) === false) {
                handles.push(handle)
                var alreadyExistingProblemSet = []
                const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=20`)

                const ProblemSetInfo = response.data.result.filter((info) => {
                    return info.verdict === "OK"
                })


                var list = []
                for (let i = 0; i < ProblemSetInfo.length; i++) {
                    alreadyExistingProblemSet.push(ProblemSetInfo[i].problem)
                    list.push(ProblemSetInfo[i].problem)
                }

                var newGuy = {
                    ...allHandlePsetInfo
                }

                newGuy[handle] = [...alreadyExistingProblemSet]



                // console.log(allHandlePsetInfo)
                for (let i = 0; i < listHandle.length; i++) {

                    let individualPset = [...allHandlePsetInfo[listHandle[i]]]
                    for (let j = 0; j < individualPset.length; j++) {
                        list.push(individualPset[j])

                    }
                }

                //  console.log("RangeFIlter length ",filterRangePset.length)
                //console.log("LadderFilter length ", filterLadderPset.length)
                setPsetInfo(newGuy)
                setListHandle(handles)
                setFilterTagPset([...list])

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
    const handleList = (general) => (



        general ? <Display info={general} personalInfo={personalPsetOnCf} stats={allPset} tags={allTags} ladders={allLadder} />
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
        console.log(startRange, endRange)
        triggerRender.current = true


        setCurrentRange([startRange, endRange])




    }
    const clearRange = () => {
        triggerRender.current = true
        setStartRange('')
        setEndRange('')
        setCurrentRange([])
    }

    const handleRemovePerson = (info) => {

        const data = [...listHandle]
        const filter = data.filter((name) => name !== info)
        const updatedObject = allHandlePsetInfo
        triggerRender.current = true
        delete updatedObject[info]

        let psetHolder = []
        for (let i = 0; i < listHandle.length; i++) {
            if (listHandle[i] !== info) {
                let individualPset = [...allHandlePsetInfo[listHandle[i]]]

                for (let x of individualPset) {
                    psetHolder.push(x)
                }
            }
        }
        setFilterTagPset(psetHolder)

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
    const handleTagSubmit = (event) => {
        event.preventDefault()
        //Problem tags
    }
    const handleLadderChange = (event) => {

        setLadderField(event.target.value)
    }
    const handleSubmitLadder = (event) => {
        event.preventDefault()
        const prevLadder = [...currentLadder]

        triggerRender.current = true
        if (allLadder.includes(ladderInputField)) {

            if (!prevLadder.includes(ladderInputField)) {
                prevLadder.push(ladderInputField)



                setCurrentLadder([...prevLadder])
            }
            else {
                alert("Already added ")
            }

        }
        else {
           
            alert("Please enter the valid tag")
        }
    }
    const handleRemoveLadder = (data) => {
      
        triggerRender.current = true
        let listLadder = currentLadder.filter((info) => info !== data.info)
         setCurrentLadder([...listLadder])
    }
    return (
        <div className="mainField">


            <div className="content-problemset">
                <div className="lablesFiled">

                    {
                        currentLadder.length > 0 ?

                            currentLadder.map((info, index) => {
                                return (

                                    <div key={index} className="ui image label">
                                        <span>{info}</span>

                                        <i className="delete icon" onClick = {() => handleRemoveLadder({info})}></i>
                                    </div>
                                )
                            })
                            :
                            null


                    }

                </div>
                <div className="content">
                    <div className="pset">
                        {
                            handleList(updatedSet.current)
                        }

                    </div>

                    <div className="controls">

                        <form onSubmit={handleRangeSubmit}>
                            <input value={startRange} onChange={(event) =>handleStartRange(event)} />

                            <input value={endRange} onChange={event => handleEndRange(event)} />
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
                        {/* <div>
                         {
                           allTags.map((i,index) => <p key = {index}>{i}</p>)
                        } 

                    </div> */}
                        <button onClick={(event) => handleTagSubmit(event)}></button>
                        <div className="ladderControls">
                            <h1>
                                Ladders
                            </h1>
                            <input type="text" value={ladderInputField} onChange={(event) => handleLadderChange(event)} />
                            <button onClick={(event) => handleSubmitLadder(event)}>Add ladder</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Train