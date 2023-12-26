import axios from "axios";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

function CurrentMonthChart() {
  const [expensesData, setExpensesData] = useState([]);
  const expensesURL = "http://localhost:3000/expenses";
  const categoriesURL = "http://localhost:3000/categories";
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A13E3A",
    "#5831A8",
    "#03fc1c",
    "#fc03fc",
    "#342c42",
    "#60614e",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesResponse, categoriesResponse] = await Promise.all([
          axios.get(expensesURL),
          axios.get(categoriesURL),
        ]);

        const expensesArray = expensesResponse.data.reduce(
          (accumulator, { category, amount, date }) => {
            const month = new Date(date).getMonth() + 1;
            if (month === currentMonth) {
              accumulator[category] = (accumulator[category] || 0) + amount * 1;
            }
            return accumulator;
          },
          {}
        );

        const categoryNames = categoriesResponse.data.reduce(
          (accumulator, { category }) => {
            accumulator[category] = true;
            return accumulator;
          },
          {}
        );

        const finalResult = Object.keys(expensesArray).map((category) => ({
          category,
          amount: expensesArray[category],
        }));

        // Filter out categories that don't have any expenses for the current month
        const filteredResult = finalResult.filter(
          (item) => item.category in categoryNames
        );

        setExpensesData(filteredResult);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [expensesURL, categoriesURL, currentMonth]);

  // Prepare data for the pie chart
  const chartData = {
    labels: expensesData.map((entry) => entry.category),
    datasets: [
      {
        data: expensesData.map((entry) => entry.amount),
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
        borderColor: "transparent",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = expensesData[context.dataIndex].amount;
            return `€${value}`;
          },
        },
      },
      datalabels: {
        color: "#fff", // Label text color
        font: {
          size: 14, // Label font size
          weight: "bold", // Label font weight
        },
        textPadding: 5,
        formatter: (value, context) => {
          const percentage = (
            (context.dataset.data[context.dataIndex] /
              context.dataset.data.reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(0);
          if (percentage < 4) return "";
          else return `${percentage}%`;
        },
        anchor: "center",
        align: "center",
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "410px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
      }}
    >
      <Pie
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}

export default CurrentMonthChart;
