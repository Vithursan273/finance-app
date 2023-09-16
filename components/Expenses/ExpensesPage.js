"use client";
import styles from "./styles.module.css";
import { React, useState, useEffect } from "react";
import SummaryChart from "@/components/SummaryChart";
import ExpenseItem from "@/components/Expenses/ExpenseItem";
import ExpenseModal from "@/components/Expenses/ExpenseModal";

const ExpensesList = () => {
  const getCSRFToken = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      .split("=")[1];
    return cookieValue;
  };
  const [showModal, setShowModal] = useState(false);

  const handlePreview = () => {
    setShowModal(true);
  };

  const [formData, setFormData] = useState({
    expenseName: "",
    expenseCategory: "",
    expenseCost: 0,
    expenseFrequency: "",
  });

  const [objectArrayState, setObjectArrayState] = useState([]);

  const [summary, setSummary] = useState({
    totalExpenses: "",
    categoryExpenses: {},
  });

  const calculateTotalExpenses = () => {
    var total = 0;
    var categoryTotal = {};
    for (let i = 0; i < objectArrayState.length; i++) {
      total += objectArrayState[i].expenseCost;
      if (categoryTotal.hasOwnProperty(objectArrayState[i].expenseCategory)) {
        categoryTotal[objectArrayState[i].expenseCategory] +=
          objectArrayState[i].expenseCost;
      } else {
        categoryTotal[objectArrayState[i].expenseCategory] =
          objectArrayState[i].expenseCost;
      }
    }
    // console.log(categoryTotal);
    setSummary((prevSummary) => ({
      ...prevSummary,
      totalExpenses: total,
      categoryExpenses: categoryTotal,
    }));
  };

  useEffect(() => {
    fetchUser();
    fetchReactData();
  }, []);

  useEffect(() => {
    if (objectArrayState.length) {
      calculateTotalExpenses();
    }
  }, [objectArrayState]);

  const fetchUser = async () => {
    const csrfToken = getCSRFToken();
    try {
      const response = await fetch("http://127.0.0.1:8000/user/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      // console.log(data);

      setObjectArrayState(objectArray);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const fetchReactData = async () => {
    const csrfToken = getCSRFToken();
    try {
      const response = await fetch("http://127.0.0.1:8000/expenses/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      const objectArray = Object.values(data);

      setObjectArrayState(objectArray);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();
    for (let i = 0; i < objectArrayState.length; i++) {
      if (objectArrayState[i].expenseName == formData.expenseName) {
        return;
      }
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/expenses/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data to the server");
      }
      setShowModal(false);
      setFormData({
        expenseName: "",
        expenseCategory: "",
        expenseCost: 0,
        expenseFrequency: "",
      });
      fetchReactData();
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  const handleDelete = async (expenseName) => {
    const csrfToken = getCSRFToken();
    try {
      const response = await fetch("http://127.0.0.1:8000/expenses/", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ expenseName }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete data from the server");
      }

      // Update the state to reflect the changes after successful deletion
      // setReactData((prevData) =>
      //   prevData.filter((item) => item.employee !== employee)
      // );
      fetchReactData();
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchExpensePdf = async () => {
    const csrfToken = getCSRFToken();
    try {
      const response = await fetch("http://127.0.0.1:8000/expense_pdf/", {
        method: "GET",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const pdfBlob = await response.blob();

      // Create a URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab for download
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  return (
    <div className={`${styles.page_container}`}>
      <SummaryChart summary={summary} />
      <div className={`${styles.expense_container}`}>
        {objectArrayState.map((expense) => (
          <div id={expense.expenseName}>
            <ExpenseItem
              expenseName={expense.expenseName}
              expenseCategory={expense.expenseCategory}
              expenseCost={expense.expenseCost}
              expenseFrequency={expense.expenseFrequency}
              deleteItem={() => handleDelete(expense.expenseName)}
            />
          </div>
        ))}
      </div>
      <ExpenseModal
        isVisible={showModal}
        formData={formData}
        currentItems={objectArrayState}
        onClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <button
        className={`text-[16px] bg-gray-500 text-white px-4 py-2 rounded mr-1.5 mt-[10px]`}
        onClick={handlePreview}
      >
        ADD
      </button>
      <button
        className={`text-[16px] bg-red-500 text-white px-4 py-2 rounded mr-1.5 mt-[10px]`}
        onClick={fetchExpensePdf}
      >
        EXPORT
      </button>
    </div>
  );
};

export default ExpensesList;
