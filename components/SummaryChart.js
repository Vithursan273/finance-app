"use client";
import styles from "./styles.module.css";
import { React, useState, useEffect } from "react";

const SummaryChart = ({ summary }) => {
  console.log(summary);
  let item = summary.categoryExpenses;

  return (
    <div>
      <div>Summary of Expenses</div>
      <div>Total Expenses: {summary.totalExpenses}</div>
      {Object.entries(summary.categoryExpenses).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      ))}
    </div>
  );
};

export default SummaryChart;
