import React from 'react'
import { Doughnut} from 'react-chartjs-2';

const Doughnuts = (props) => {

    let AvgTimeTopic = []
   
    for(let value of props.TopicInfo){
        let time = Math.ceil(props.TopicWiseAvg.get(value)[0] /  props.TopicWiseAvg.get(value)[1])
        let minutes  = Math.ceil(time/ 60)
        AvgTimeTopic.push(minutes)
    }
    var data = {
        labels: [...props.TopicInfo],
        datasets: [
            {

                data: [...AvgTimeTopic],
                backgroundColor: 'green'

            }
        ]
    }

    return (
        
        <div className="Doughnut">
           
         
            
             <div className = "DoughnutContainer">
             <Doughnut
                data={data}

                options={{
                   
                   
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position:'right'
                        },
                        title: {
                            display: true,
                            text: 'Topic vs Time (in minutes)',
                            fontSize: 50
                        }
                    }
                }}
            />
             </div>
            </div>
         
    )

}
export default Doughnuts