import React from 'react'


//{getSolvedNumber(inf.problem.tags, inf.problem.name)}

const Display = (props) => {
    const getSolvedNumber = (INFO) => {
      const stats = props.stats.filter((info) => ((Number(INFO.contestId) === Number(info.contestId)) && (String(INFO.index) ===String(info.index))))
    
      if(stats[0])
      {
          let obj = stats[0]
          
          return obj.solvedCount
      }
        else{
           //Unusual behaviour
           //Potential bug 
            return "Unavailable"
        }
   
            
    }
    const checkAppropriateColor = (INFO) => {
       
        
      if(props.personalInfo.length)
      {
          
       
       
        const isElementPresent = props.personalInfo.filter((info) => ((info.problem.contestId === INFO.contestId) && (info.problem.index === INFO.index)))
        
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
                        <td>
                            {inf.index}
                        </td>
                        <td >
                            <div className = "psetDisplayStyle">
                            <a href = {`https://codeforces.com/problemset/problem/${inf.contestId}/${inf.index}` } target="_blank" rel="noopener noreferrer">{inf.name}</a> <p className ="smallTagDisplay">{[inf.tags.map((topic)=>`${topic}; `) ]}</p>
                            </div>
                        </td>
                        <td >{inf.rating}</td>
                        <td >🤺 x{getSolvedNumber(inf)}</td>
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
                            <th><h2>#</h2></th>
                            <th ><h2>Problem</h2></th>
                            <th ><h2>Rating</h2></th>
                            <th ><icon className="iconTick"></icon></th>
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