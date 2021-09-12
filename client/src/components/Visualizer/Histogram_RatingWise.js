import React from 'react'
import { Bar} from 'react-chartjs-2';

const Histogram = (props) => {
    let AvgTime = []
    console.log(props.RatingInfo)
    for (let value of props.RatingInfo) {
        let time = props.RatingWiseAvg.get(value)[0]
        let minutes = Math.ceil(time / 60)
        //  let seconds = time - minutes * 60
        AvgTime.push(minutes)
    }
    var data = {
        labels: [...props.RatingInfo],
        datasets: [
            {

                data: [...AvgTime],
                backgroundColor: 'pink'

            }
        ]
    }
    return (
        
        <div className="Histogram">

            <Bar
                data={data}

                options={{
                   
                   
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Rating vs Time (in minutes)',
                            fontSize: 50
                        }
                    }
                }}
            />
            </div>
         
    )

}
export default Histogram