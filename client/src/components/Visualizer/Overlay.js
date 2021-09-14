import React from 'react'

const Overlay = ({ date, DateWise,setDate }) => {
    return (

        <div className="Overlay">
            <span className="Cancel-overlay" onClick={() => setDate(null)}>❌</span>
            <div>
                {
                    DateWise &&
                    DateWise.get(date).map((info, index) => {
                        return (
                            (info.verdict === "OK") ?

                                <ul> <a
                                    key={index}
                                    href={`https://codeforces.com/problemset/problem/${info.problem.contestId}/${info.problem.index}`}
                                    target="_blank"><h3>{info.problem.name}</h3></a></ul>
                                :
                                null

                        )
                    })
                }

            </div>

        </div>

    )
}
export default Overlay