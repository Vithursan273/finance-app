"use client";

import React from "react";
import { categories } from "./data.js";

const ExpenseModal = ({
  isVisible,
  formData,
  onClose,
  handleSubmit,
  handleChange,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-9999">
      <div className="w-[600px] h-[500px] flex flex-col">
        <button
          className="text-white text-xl place-self-end bg-blue-500 close-btn"
          onClick={() => onClose()}
        >
          {" "}
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="bg-white p-2 rounded overflow-y-scroll scrollbar scrollbar-w-2">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Expense:</label>
              <input
                type="text"
                id="expenseName"
                name="expenseName"
                value={formData.expenseName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Select Category:</label>
              <select
                id="expenseCategory"
                name="expenseCategory"
                value={formData.expenseCategory}
                onChange={handleChange}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="department">Cost:</label>
              <input
                type="number"
                id="expenseCost"
                name="expenseCost"
                value={formData.expenseCost}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name">Frequency:</label>
              <input
                type="text"
                id="expenseFrequency"
                name="expenseFrequency"
                value={formData.expenseFrequency}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
