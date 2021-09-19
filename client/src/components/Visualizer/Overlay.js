import React from 'react'

const Overlay = ({ date, DateWise,setDate }) => {
   
    return (

        <div className="Overlay">
           
             <ol className = "OverlayQn">
                 {
                      <h2 className="Cancel-overlay" onClick={() => setDate(null)}>❌</h2>
                 }
             {
                    DateWise &&
                    DateWise.get(date).map((info, index) => {
                        return (
                            (info.verdict === "OK") ?
                               
                                <li key={index} style = {{backgroundColor: "green", color: "black", margin: "2px", borderRadius: "10px", padding: "1em", textAlign:"center"}}> <a
                                    
                                    href={`https://codeforces.com/problemset/problem/${info.problem.contestId}/${info.problem.index}`}
                                    target="_blank" rel="noreferrer"><h3 style = {{color: "black"}}>{info.problem.name}</h3></a></li>
                                :
                                <li key={index} style = {{backgroundColor: "red", color: "black", margin: "2px", borderRadius: "10px", padding: "1em", textAlign: "center"}}> <a
                                    
                                    href={`https://codeforces.com/problemset/problem/${info.problem.contestId}/${info.problem.index}`}
                                    target="_blank" rel="noreferrer"><h3 style = {{color: "black"}}>{info.problem.name}</h3></a></li>
                                

                        )
                    })
                }

             </ol>
               
            

        </div>

    )
}
export default Overlay