import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api'
import {Line,Bar} from 'react-chartjs-2';
import styles from './chart.module.css';

const Charts = ({data:{confirmed,recovered,deaths},country}) => {
 const [dailyData, setDailyData] = useState({});

 useEffect(() => {
    const fetchAPI = async ( ) => {
        setDailyData(await fetchDailyData());
    }
    // console.log(dailyData);
    fetchAPI();
 } ,[]);
//  console.log(dailyData);
 const lineChart  = (
   dailyData[0]
   ? (
        <Line 
    data={{
        labels:dailyData.map(({date}) => date),
        datasets:[{
            data: dailyData.map((data) => data.confirmed),
            label:'Infected',
            backgroundColor:'rgb(128, 128, 255,0.2)',
            borderColor:'rgba(0, 0, 250, 1)',
            fill: true,
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
              }
        },{
            data: dailyData.map((data) => data.deats),
            label: 'Deaths',
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgb(255, 128, 128,0.2)',
            fill: true,
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
              }
        }]
    }}
 />
    ) : null
 );

 const barChart = (
     confirmed
     ?(
         <Bar 
         data={{
            labels:['Infected','Recovered','Deaths'],
            datasets:[{
                labels:'people',
                backgroundColor:[
                    'rgb(128, 128, 255,0.2)',
                    'rgb(159, 255, 128,0.2)',
                    'rgb(255, 128, 128,0.2)',
                ],
                borderColor:[
                    'rgba(0, 0, 250, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth:1,
                data:[confirmed.value,recovered.value,deaths.value]
            }]
         }}
         options={{
             legend:{display:false},
             title:{display:true, text:`Current State in ${country}`}
         }}
         />
     ): null
 )
    return(
       <div className={styles.container}> 
           {country? barChart : lineChart}
       </div>
    );
};

export default Charts;