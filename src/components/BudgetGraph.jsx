import { useEffect, useState } from 'react';
import axios from 'axios';
import './BudgetChart.scss'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const BudgetURL = "http://localhost:3000/budget/";

function BudgetGraph() {
    const [budgetData, setbudgetData] = useState([]);
    useEffect(() => {
        axios
          .get(BudgetURL)
          .then((response) => setbudgetData(response.data))
          .catch((error) => console.log(error));
      }, []);

      let budgetCategories = budgetData.map((item) => item.category);
      let budgetLimits = budgetData.map((item) => item.limit)
      
    const data = {
        labels: budgetCategories,
        datasets: [
            {
                label: 'Категорії',
                data: budgetLimits,
                borderColor: "#018cff",
                backgroundColor: '#FFA500',
                borderWidth: 2
            }
        ]
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: {
                    color: '#383838', // Specify the color of the grid lines
                    borderDash: [1, 1], // Specify the style of the grid lines
                    lineWidth: 1, // Specify the width of the grid lines
                },
                ticks: {
                    font: {
                      family: 'Arial',
                      size: 12,
                      weight: 'bold',
                    },
                    color: '#CCC',
                    padding: 10,
                    callback: function(value) {
                        return value + '€';
                      },
                },
                }, 
                x: {
                    grid: {
                        color: "transparent", // Specify the color of the grid lines
                        borderDash: [5, 5], // Specify the style of the grid lines
                        lineWidth: 1, // Specify the width of the grid lines
                    },
                    ticks: {
                      font: {
                        family: 'Arial',
                        size: 12,
                        weight: 'bold',
                      },
                      color: '#CCC',
                      padding: 10,
                    },
                  },
        },
        plugins: {
            title: {
              display: true,
              text: 'Діаграма лімітів',
              font: {
                size: 23,
                weight: 'bold',
              },
              color: '#FFF',
            },
          },
      };
    return ( 
        <>
        <div className='budgetGraphBody'>
                <div className='barChartContainer'>
            <div className='budgetGraphBorder'>
                    <div className='barChartBudget'>
                        <Bar
                            data = {data}
                            options = {options}
                            className='Bar'
                        >
                        </Bar>
                    </div>
            </div>
                </div>
        </div>
        </>
     );
}

export default BudgetGraph;