import React from 'react'
import axios from 'axios'
const getSolvedNumber = async (tags, QnName) => {
    const tagFormat = tags.map((topic) => `${topic};`)

    //  const data = await axios.get(`https://codeforces.com/api/problemset.problems?tags=${tagFormat}`)
    console.log(tags)
}
//{getSolvedNumber(inf.problem.tags, inf.problem.name)}

const Display = (props) => {
    const list = (props) => {

        const data = props.map((inf, index) => {
            return (
                <tr key={index}>
                    {/* <td><tr><td><p>{inf.problem.name}</p> </td> <td>{[inf.problem.tags.map((topic)=>`${topic}; `) ]}</td></tr></td> */}
                    <td>{inf.problem.name}</td>
                    <td>{inf.problem.rating}</td>
                    <td className="positive">🤺 x</td>
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