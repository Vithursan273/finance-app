"use client";
import styles from "./styles.module.css";
import { React, useState, useEffect } from "react";
import PieChart from "@/components/Graphs/PieChart.js";

const SummaryChart = ({ summary }) => {
  let item = summary.categoryExpenses;

  return (
    <div
      className={`bg-gray-200 p-10 border-[3px] border-indigo-600 rounded-md`}
    >
      <h1 className={`text-[24px] font-bold mb-[10px]`}>Summary of Expenses</h1>
      <div className={`flex`}>
        <div className={`flex-1 p-4`}>
          <div className={`mb-[10px]`}>
            <h2 className={`text-[20px] text-center font-bold`}>
              Expense Summary
            </h2>
            <p>
              This is where important general expense information can be found.
            </p>
          </div>
          <div>Total Expenses: ${summary.totalExpenses}</div>
        </div>
        <div className={`flex-1 p-4`}>
          <div className={`mb-[10px]`}>
            <h2 className={`text-[20px] text-center font-bold`}>
              Expenses by Categories
            </h2>
            <p>This is where expense totals by categories will be displayed.</p>
          </div>
          <table className={`bg-red-500 w-full`}>
            {Object.entries(summary.categoryExpenses).map(
              ([key, value], index) => (
                <tr
                  key={key}
                  className={
                    index % 2 === 0 ? "bg-indigo-300" : "bg-indigo-200"
                  }
                >
                  <td className={`p-[2px]`}>{key}:</td>
                  <td className={`p-[2px]`}>${value}</td>
                </tr>
              )
            )}
          </table>
        </div>
        <div className={`flex-1 p-4 grid place-items-center`}>
          <div className={`mb-[10px]`}>
            <h2 className={`text-[20px] text-center font-bold`}>
              Graphical Analysis
            </h2>
            <p>
              This is where expense can be visually analyzed with a variety of
              graph formats.
            </p>
          </div>
          <PieChart summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default SummaryChart;
