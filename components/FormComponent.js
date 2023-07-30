"use client";
import styles from "./styles.module.css";
import { React, useState, useEffect } from "react";
import ExpenseItem from "@/components/ExpenseItem";
import ExpenseModal from "@/components/ExpenseModal";

const FormComponent = () => {
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
    expenseCost: "",
    expenseFrequency: "",
  });
  const [objectArrayState, setObjectArrayState] = useState([]);

  useEffect(() => {
    fetchReactData();
  }, []);

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
        expenseCost: "",
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

  return (
    <div className={`${styles.page_container}`}>
      {/* <div className={`${styles.form_container}`}>
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
            <label htmlFor="department">Cost:</label>
            <input
              type="text"
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
      </div> */}
      <div className={`${styles.expense_container}`}>
        {objectArrayState.map((expense) => (
          <div id={expense.expenseName}>
            <ExpenseItem
              expenseName={expense.expenseName}
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
      <span className={`text-[16px]`} onClick={handlePreview}>
        ADD
      </span>
    </div>
  );
};

export default FormComponent;
