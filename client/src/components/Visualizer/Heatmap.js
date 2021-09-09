import React, { useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
const today = new Date()
const options = [
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 }
  ]
const HeatMap = () => {
    const [year, setYear] = useState(options[0].value)
    const randomValues = getRange(200).map(index => {
        return {
            date: shiftDate(today, -index),
            count: getRandomInt(1, 3),
        };
    });
   
    return (
        <div className="HEATMAP-Container">
           <div className = "HeadingContainer">
               
             <h2> HeatMap</h2>
               <Select 
               className = "dropdown" 
               options={options} 
               defaultValue = { { value: year, label: year }}
               onChange = {(option) => setYear(option.value) }
               />
              
           </div>
            <CalendarHeatmap
                startDate={new Date(year, 0,0)}
                endDate={new Date(year, 11,31)}
                values={randomValues}
                classForValue={value => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-github-${value.count}`;
                }}
                tooltipDataAttrs={value => {
                    return {
                        'data-tip': `${value.date} has count: ${value.count
                            }`,
                    };
                }}
                showWeekdayLabels={true}
                onClick={value => alert(`Clicked on value with count: ${value.count}`)}
            />
            <ReactTooltip />
        </div>
    );
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default HeatMap