import React from 'react'
import axios from 'axios'

//{getSolvedNumber(inf.problem.tags, inf.problem.name)}

const Display = (props) => {
    const getSolvedNumber = (INFO) => {
        ////const tagFormat = INFO.problem.tags.map((topic) => `${topic};`)
    
        //  const data = await axios.get(`https://codeforces.com/api/problemset.problems?tags=${tagFormat}`)
      // console.log(tagFormat)
       // const response = await axios.get(`https://codeforces.com/api/problemset.problems?tags=${tagFormat}`)
        // console.log(response)
        const response = async(INFO)=>{
            var actualTagFromat = ""
            const tagFormat = INFO.problem.tags.map((topic) => {
                actualTagFromat += `${topic};`
             return`${topic};`
            })
          try{
            const response = await axios.get(`https://codeforces.com/api/problemset.problems?tags=${actualTagFromat}`)
            console.log("From ehre ",response.data.result.problemStatistics)
          }
          catch(err){
              console.log(err.message)
          }
             
           
        }
        response(INFO)
       return 1000
    }
    const checkAppropriateColor = (INFO) => {
       
        
      if(props.personalInfo.length)
      {
          
       
       
        const isElementPresent = props.personalInfo.filter((info) => ((info.problem.contestId === INFO.problem.contestId) && (info.problem.index === INFO.problem.index)))
        
        if(!isElementPresent[0])
        {
            return ""
        }
        else{
           if(isElementPresent[0].verdict === 'OK')
           {
               return "Positive"
           }
        }
          return "Negative"
      }
      return ""
      
        
    }
        const list = (INFO) => {

            const data = INFO.map((inf, index) => {
                return (
                    <tr key={index}  className={checkAppropriateColor(inf)}>
                        {/* <td><tr><td><p>{inf.problem.name}</p> </td> <td>{[inf.problem.tags.map((topic)=>`${topic}; `) ]}</td></tr></td> */}
                        <td>{inf.problem.name}</td>
                        <td>{inf.problem.rating}</td>
                        <td>🤺 x{getSolvedNumber(inf)}</td>
                    </tr>
                )

            })
            return data
        }
        return (
            <React.Fragment>
                <table className="ui celled table unstackable">
                    <thead>
                        <tr>
                            <th><h2>Problem</h2></th>
                            <th><h2>Rating</h2></th>
                            <th><span className="iconTick"></span></th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            list(props.info)
                        }

                    </tbody>
                </table>
            </React.Fragment>
        )
    }
    export default Display