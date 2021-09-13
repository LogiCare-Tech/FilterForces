import React, {  useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import Overlay from './Overlay'




const HeatMap = ({ optionWise, DateWise, YearInfo }) => {
    const [year, setYear] = useState(optionWise[0].value)
    const [date, setDate] = useState(null)
    const randomValues = []

    for (let info of DateWise) {
        randomValues.push({
            date: info[0],
            count: info[1].length
        })
    }

    randomValues.reverse()
    const handleOverlay = (value) => {
        setDate(value.date)


    }
    return (



        <div>
            {date ?<Overlay date = {date} DateWise={DateWise} setDate = {setDate}/>
                : <div className="MainContainer">

                    <div className="HEATMAP-Container">

                        <div className="HeadingContainer">

                            <h2> HeatMap</h2>
                            <Select
                                className="dropdown"
                                options={optionWise}
                                defaultValue={{ value: optionWise[0].value, label: optionWise[0].label }}
                                onChange={(option) => setYear(Number(option.value))}
                            />

                        </div>
                        <CalendarHeatmap
                            startDate={new Date(year, 0, 0)}
                            endDate={new Date(year, 11, 31)}
                            values={randomValues}
                            gutterSize={2}
                            classForValue={value => {
                                if (!value) {
                                    return 'color-empty';
                                }
                                return `color-github-${value.count}`;
                            }}
                            tooltipDataAttrs={value => {
                                if (value.count > 0) {
                                    return {
                                        'data-tip': `${value.date} has count: ${value.count
                                            }`,
                                    }
                                }

                            }}
                            showWeekdayLabels={true}
                            onClick={value => handleOverlay(value)}
                        />
                        <ReactTooltip />
                    </div>



                </div>

            }
        </div>



    )

}


export default HeatMap