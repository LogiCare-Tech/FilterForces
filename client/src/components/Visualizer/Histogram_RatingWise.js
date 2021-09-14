import React from 'react'
import { Bar} from 'react-chartjs-2';

const Histogram = (props) => {
    let AvgTime = []
  
    for (let value of props.RatingInfo) {
        let time = Math.ceil(props.RatingWiseAvg.get(value)[0] / props.RatingWiseAvg.get(value)[1])
        let minutes = Math.ceil(time / 60)
        //  let seconds = time - minutes * 60
        AvgTime.push(minutes)
    }
    let AvgTimeType = []

    for(let value of props.TypeInfo){
        let time = Math.ceil(props.TypeWiseAvg.get(value)[0] /  props.TypeWiseAvg.get(value)[1])
        let minutes  = Math.ceil(time/ 60)
        AvgTimeType.push(minutes)
    }
    var data = [{
        labels: [...props.RatingInfo],
        datasets: [
            {

                data: [...AvgTime],
                backgroundColor: 'pink'

            }
        ]
    }, 
{
    labels: [...props.TypeInfo],
    datasets: [
        {

            data: [...AvgTimeType],
            backgroundColor: 'green'

        }
    ]
}]
    return (
        
        <div className="Histogram">
           <div className = "HistoContainer">
           <Bar
                data={data[0]}

                options={{
                   
                   maintainAspectRation: true,
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
           <div className = "HistoContainer">
           <Bar
                data={data[1]}

                options={{
                   
                    maintainAspectRation: true,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                       
                        },
                        title: {
                            display: true,
                            text: 'Type vs Time (in minutes)',
                            fontSize: 50
                        }
                    }
                }}
            />
           </div>
             


            </div>

         
    )

}
export default Histogram