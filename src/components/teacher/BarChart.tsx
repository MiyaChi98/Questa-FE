// src/ScoreChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ScoreChart = () => {
  const countMap = {
    '<1': 5,
    '<2': 7,
    '<3': 8,
    '<4': 9,
    '<5': 11,
    '<6': 2,
    '<7': 5,
    '<8': 7,
    '<9': 8,
    '<10': 7,
  };

  const labels = Object.keys(countMap);
  const data = Object.values(countMap);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Counts',
        data: data,
        backgroundColor: 'rgba(54, 162, 235,0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        // text: 'Score Spectrum',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ScoreChart;
