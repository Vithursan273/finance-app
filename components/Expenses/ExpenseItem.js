"use client";
import styles from "./styles.module.css";
import { React, useState, useEffect } from "react";

const ExpenseItem = ({
  expenseName,
  expenseCategory,
  expenseCost,
  expenseFrequency,
  deleteItem,
}) => {
  return (
    <div className={`${styles.expense_item}`}>
      <div className={`${styles.expense_child}`}>{expenseName}</div>
      <div className={`${styles.expense_child}`}>{expenseCategory}</div>
      <div className={`${styles.expense_child}`}>{expenseCost}</div>
      <div className={`${styles.expense_child}`}>{expenseFrequency}</div>
      <button onClick={deleteItem}>Delete</button>
    </div>
  );
};

export default ExpenseItem;
