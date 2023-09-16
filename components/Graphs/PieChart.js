"use client";
import styles from "./styles.module.css";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

const PieChart = ({ summary }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const keys = Object.keys(summary.categoryExpenses || {});
      const values = Object.values(summary.categoryExpenses || {});

      if (chartInstance.current) {
        chartInstance.current.destroy(); // <-- destroy the previous chart if it exists
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: keys,
          datasets: [
            {
              data: values,
              backgroundColor: ["red", "blue", "green", "yellow", "purple"],
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Sample Pie Chart",
          },
        },
      });
    }
  }, [summary]);

  return <canvas ref={chartRef} className={styles.canvasSize}></canvas>;
};

export default PieChart;
