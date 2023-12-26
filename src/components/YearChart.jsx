import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
} from "chart.js";
import SelectYear from "./SelectYear";
import YearFilter from "./YearFilter";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title
);

const YearChart = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const baseURL = "http://localhost:3000/";
  const labels = [
    "Sau",
    "Vas",
    "Kov",
    "Bal",
    "Geg",
    "Bir",
    "Lie",
    "Rugp",
    "Rugs",
    "Spa",
    "Lap",
    "Gru",
  ];

  const [dataFilteredByYear, uniqueDates] = YearFilter(year);
  const transformedData = transformData(dataFilteredByYear);

  const sortedArray = transformData(incomes, expenses);
  const includedMonths = sortedArray.map((item) => item.month);
  const filteredLabels = labels.filter((label) =>
    includedMonths.includes(label)
  );

  const incomeData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Доходи",
        data: transformedData.map((item) => item.income),
        backgroundColor: "#2E63F5",

        borderColor: "#2E63F5",
        pointBorderColor: "#2E63F5",
      },
      {
        label: "Витрати",
        data: transformedData.map((item) => item.expense),
        backgroundColor: "#FF10F0",
        borderColor: "#FF10F0",
        pointBorderColor: "#FF10F0",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Таблиця порівняння доходів та витрат",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(baseURL + "incomes")
        .then((response) => setIncomes(response.data));
      await axios
        .get(baseURL + "expenses")
        .then((response) => setExpenses(response.data));
    };
    fetchData();
  }, []);

  function transformData(dataFilteredByYear) {
    const groupedData = {};
  
    dataFilteredByYear.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      if (!groupedData[month]) {
        groupedData[month] = { income: 0, expense: 0 };
      }
  
      if (item.type === 'income') {
        groupedData[month].income += parseFloat(item.amount);
      } else if (item.type === 'expense') {
        groupedData[month].expense += parseFloat(item.amount);
      }
    });
    const chartData = [];

    Object.entries(groupedData).forEach(([month, { income, expense }]) => {
      chartData.push({ month, income, expense });
    });

    const includedMonths = chartData.map((item) => item.month);
    const filteredData = chartData.filter((item) =>
      includedMonths.includes(item.month)
    );

    const getMonthName = (monthNumber) => {
      const date = new Date();
      date.setMonth(monthNumber - 1);

      return date.toLocaleString("lt-LT", {
        month: "long",
      });
    };

    let sortedArray = filteredData.map((item) => {
      return {
        income: item.income,
        expense: item.expense,
        month:
          getMonthName(item.month).charAt(0).toUpperCase() +
          getMonthName(item.month).slice(1, 3),
      };
    });
    return sortedArray;
  }

  return (
    <div>
      <div className="d-flex justify-content-center p-3">
        <SelectYear uniqueDates={uniqueDates} setYear={setYear} year={year} />
      </div>
      <div className="line-chart">
        <Line data={incomeData} options={options}></Line>
      </div>
    </div>
  );
};

export default YearChart;
