import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './DisplayList'
import AddNewRange from './AddNewRange'
import ReactGa from 'react-ga'
import AddNewHandle from './AddNewHandle'
import AddNewLadder from './AddNewLadder'
const Train = () => {

    useEffect(() => {
        ReactGa.initialize("UA-207957581-1")
        ReactGa.pageview(window.location.pathname) 
        alert(`sending data ${window.location.pathname}`)
    }, [])
 

    const [listHandle, setListHandle] = useState([])

    //@updatedSet => Stores the filtered problem list
    const [updatedSet, setUpdate] = useState([])
   


  
   

    /*
    @allHandlePsetInfo => {
        "handle1": [...pset solved by the user handle1],
        "handle2": [...pset solved by the user handle2]
                 :
                 :  
    }
    */
    const [allHandlePsetInfo, setPsetInfo] = useState({})






    /*
      @personalHandle => user's handle
      @personalPsetOnCf => user's pset history
    */
    const [personalHandle, setPersonalHandle] = useState('')
    const [personalPsetOnCf, setPersonalPsetOnCf] = useState([])




    /*
        variable allTags =>Stores All topics that are present in Codeforces
                 allLadder => Stores ladders (Ex: A, B, C, D1, D2 ...)
                 allPset => Stores all problems on Codeforces platform

     */

    const [allPset, setAllPset] = useState([])
    const [allTags, setAllTags] = useState([])
    const [allLadder, setAllLadder] = useState([])


    const [permission, setPermission] = useState(0)
    const [showTag, setShowTag] = useState("Hide the tag")
    const [contentPset, setContentPset] = useState("column")
    //Notification
    const [notification, setNotification] = useState([])

    /*
         @currentLadder => Array of user filtered Ladder (Ex: ["A", "B"])

         @currentTopics => Array of user filtered Topics (Ex: ["DP", "DSU", "Graphs"])

         @currentRange => Array of size 2;  currentRange[0] => Starting range 
                                            currentRange[1] => Ending range
                                    Ex: currentRange = [1300, 1500]
                                    Indication to display all the questions in the range [1300, 1500]
    */
    const [currentLadder, setCurrentLadder] = useState([])
    const [currentTopics, setCurrentTopics] = useState([])
    const [currentRange, setCurrentRange] = useState([])



    /*
      @display => Holds the styling params
      @topicOverlay => Holds the styling params
    */
    const [display, setDisplay] = useState("flex")
    const [topicOverlay, setTopciOverlay] = useState("none")


    //Universal pset which are filtered according to Personal Handle tags 
    const [filterTagPset, setFilterTagPset] = useState([])


    //Fetching all problems from Codeforces API and distributing data to different array when page loads
    useEffect(() => {
        let source = axios.CancelToken.source()
        const find = async () => {
            try {
                const response = await axios.get(`https://codeforces.com/api/problemset.problems`, {
                    cancelToken: source.token
                })
                var AllTags = []
                var AllLadder = []


                var sets = response.data.result.problems
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
            catch (err) {
                if (axios.isCancel(err)) {
                    console.log("fetch aborted")
                }
                else {
                    throw err
                }

            }







        }
        find()
        return () => {
            console.log("unmounting")
            source.cancel()
        }
    }, [])

    useEffect(() => {
        //Algorithm to Shortlist the Problems according to the user's filter

        let priorityPset = new Map()



            //Set every pset priority as 0
            for (let info of filterTagPset) {
                priorityPset.set(info, 0)
            }

            if (currentRange.length === 0) {
                for (let info of filterTagPset) {


                    if (currentLadder.includes(info.index)) {
                        priorityPset.set(info, priorityPset.get(info) + 1)

                    }

                    /*If Any topics under user Filtered Topic matches with current Pset, increment the priyority
                           Ex: currentTopics: ["DP", "DSU", "Graphs"]
                               Current Pset Topics => ["Bit Masks", "DSU", "Probability"]
                               "DSU" is common in both => Increment priyority
                        */
                    if (currentTopics.length) {
                        let flag = 0

                        for (let tag of info.tags) {
                            if (currentTopics.includes(tag)) {
                                flag = 1
                            }
                        }
                        if (flag) {
                            priorityPset.set(info, priorityPset.get(info) + 1)
                            flag = 0
                        }
                    }
                }
            }


            else {


                for (let info of filterTagPset) {

                    if (info.rating >= currentRange[0] && info.rating <= currentRange[1]) {

                        //If Pset lies under rating range, increment the priyority
                        priorityPset.set(info, priorityPset.get(info) + 1)

                        //If Pset lies under user Filtered Ladder, increment the priyority
                        if (currentLadder.includes(info.index)) {
                            priorityPset.set(info, priorityPset.get(info) + 1)

                        }

                        /*If Any topics under user Filtered Topic matches with current Pset, increment the priyority
                           Ex: currentTopics: ["DP", "DSU", "Graphs"]
                               Current Pset Topics => ["Bit Masks", "DSU", "Probability"]
                               "DSU" is common in both => Increment priority
                        */
                        if (currentTopics.length) {
                            let flag = 0
                            for (let tag of info.tags) {
                                if (currentTopics.includes(tag)) {
                                    flag = 1
                                }
                            }
                            if (flag) {
                                priorityPset.set(info, priorityPset.get(info) + 1)
                                flag = 0
                            }
                        }
                    }




                }
            }






            let Priority = []
            for (let info of priorityPset.values()) {
                Priority.push(info)
            }


            let listToDisplay = []
            let maxVotes = Math.max(...Priority)


            if (currentLadder.length || currentTopics.length) {
                for (let info of priorityPset) {

                    if (maxVotes > 0 && priorityPset.get(info[0]) === maxVotes) {

                        listToDisplay.push(info[0])
                    }
                }
            }
            else {
                for (let info of priorityPset) {

                    if (priorityPset.get(info[0]) === maxVotes) {

                        listToDisplay.push(info[0])
                    }
                }
            }


            let StopDuplicates = [...new Map(listToDisplay.map(obj => [JSON.stringify(obj), obj])).values()];
            if (StopDuplicates.length > 0) {
                setContentPset("row-reverse")
            }
            setUpdate([...StopDuplicates])

    

    }, [filterTagPset, currentLadder, currentRange, currentTopics])



    /*
      Controlled input change
    */

    
    
    const handlePersonalHandle = (event) => {
        setPersonalHandle(event.target.value)
    }





    /*
       Filter Controls
    */
  
    const handleAddTopic = (topic) => {
        const prevTopics = [...currentTopics]
      

        if (prevTopics.includes(topic) === false) {
            prevTopics.push(topic)
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Topic ${topic} is added successfully`, "green"])
            setCurrentTopics([...prevTopics])
        }
        else {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Already added this topic`, "red"])
        }


    }
    const handleRemoveLadder = (data) => {

        
        let listLadder = currentLadder.filter((info) => info !== data.info)
        setTimeout(() => {
            setNotification([])
        }, 2500)
        setNotification([`Ladder ${data.info} is removed successfully`, "green"])
        setCurrentLadder([...listLadder])
    }
    const handleRemoveTopic = (data => {
        
        let listTopics = currentTopics.filter((info) => info !== data.info)
        setTimeout(() => {
            setNotification([])
        }, 2500)
        setNotification([`Topic ${data.info} is removed successfully`, "green"])

        setCurrentTopics([...listTopics])
    })


    const handleAdminUsername = async (event) => {
        event.preventDefault()

        try {

            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${personalHandle}`)


            setPermission(1)
            setPersonalPsetOnCf([...response.data.result])

        }
        catch (err) {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`This handle does not exist`, "red"])
        }




    }
 

    const handleRemovePerson = (info) => {

        const data = [...listHandle]
        const filter = data.filter((name) => name !== info)
        const updatedObject = allHandlePsetInfo
    
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
        setTimeout(() => {
            setNotification([])
        }, 2500)
        setNotification([`${info} is removed successfully`, "green"])
        setFilterTagPset(psetHolder)

        setPsetInfo(updatedObject)

        setListHandle(filter)
    }

    const handleShowTag = (event) => {
        if (showTag === "Hide the tag") {
            setShowTag("Show the tag")
        }
        else {
            setShowTag("Hide the tag")
        }
    }


    //List to display (Pset)
    const handleList = (general) => (



        general ? <Display info={general} personalInfo={personalPsetOnCf} stats={allPset} tags={allTags} ladders={allLadder} showTag={showTag} />
            : null


    )








    /*
     Style Controls
    */
    const handleTopicSubmit = (event) => {
        event.preventDefault()
        setDisplay("none")
        setTopciOverlay("flex")

    }

    const contentStyle = {
        display: `${display}`
    }
    const OverlayStyle = {
        display: `${topicOverlay}`
    }
    const manageOverlayTopic = () => {

        setDisplay('flex')
        setTopciOverlay("none")
    }



    return (
        <div>
            {notification.length === 2 &&
                <div className="Notification" style={{ backgroundColor: notification[1] }}>
                    <h3> {notification[0]}</h3>
                </div>
            }

            {

                permission >= 1 ?

                    <div className="mainField">

                        {
                            (currentLadder.length > 0 || currentTopics.length > 0 || listHandle.length > 0) &&
                            <div className="lablesFiled">
                                <h4>Applied Filters</h4>
                                {


                                    currentLadder.map((info, index) => {
                                        return (

                                            <div key={index} className="ui image label filterTag LABLE">
                                                <span>{info}</span>

                                                <i className="delete icon" onClick={() => handleRemoveLadder({ info })} />
                                            </div>
                                        )
                                    })




                                }
                                {

                                    currentTopics.map((info, index) => {
                                        return (
                                            <div key={index} className="ui image label filterTag TOPIC">
                                                <span>{info}</span>

                                                <i className="delete icon" onClick={() => handleRemoveTopic({ info })} />
                                            </div>
                                        )
                                    })

                                }

                                {

                                    listHandle.map((info, index) => {
                                        return (
                                            <div className="ui image label filterTag tagFilterName" key={index}>
                                                <span>{info}</span><i className="collapse delete icon" onClick={() => handleRemovePerson(info)} />
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        }

                        <div className="content-problemset" style={{ flexDirection: contentPset }}>

                            <div className="controls" style={contentStyle}>
                               
                                <h2 >Filters</h2>

                                <AddNewRange
                                    setCurrentRange={setCurrentRange}
                                />


                                <div className="RIGHT">
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                                        <button className="ui select button" onClick={(event) => handleTopicSubmit(event)} style={{ margin: "0.3em" }}>
                                            Select the topic
                                        </button>

                                        <button style={{ margin: "0.3em" }} className="ui select button" onClick={(e) => handleShowTag(e)}>{showTag}</button>
                                    </div>
                                    <div>
                                       
                                        <AddNewHandle
                                        allHandlePsetInfo = {allHandlePsetInfo}
                                        listHandle = {listHandle}
                                        setFilterTagPset = {setFilterTagPset}
                                        setPsetInfo = {setPsetInfo}
                                        setListHandle = {setListHandle}
                                        />


                                       <AddNewLadder 
                                       allLadder = {allLadder}
                                       currentLadder = {currentLadder}
                                       setCurrentLadder = {setCurrentLadder}
                                       />
                                    </div>

                                </div>
                            </div>




                            <div className="overlayForTopics" style={OverlayStyle}>
                                <button onClick={() => manageOverlayTopic()}>
                                    ❌
                                </button>
                                {
                                    allTags.map((i, index) => <p key={index} onClick={() => handleAddTopic(i)}>{i}</p>)
                                }
                            </div>
                            <div className="content" style={contentStyle}>

                                {
                                    updatedSet.length > 0 ?
                                        handleList(updatedSet)
                                        :
                                        <h3 style={{ marginLeft: "auto", marginRight: "auto", color: "snow" }}>No questions to display (Try adding different filters)</h3>



                                }







                            </div>
                        </div>

                    </div>
                    :
                    < >





                        <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Enter your Codeforces Handle</h1>
                        <form onSubmit={(event) => handleAdminUsername(event)} className="INPUT">

                            <div className="ui action input ">



                                <input

                                    type="text"
                                    value={personalHandle}
                                    placeholder="Errichto"
                                    onChange={(event) => handlePersonalHandle(event)} />
                                <button className="ui icon button" onClick={(event) => handleAdminUsername(event)} type="submit">
                                    <i className="arrow right icon" />
                                </button>

                            </div>
                        </form>

                    </>

            }
        </div>
    )
}
export default Train