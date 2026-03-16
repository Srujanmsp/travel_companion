import React, { useState, useContext } from "react";
import BudgetSummary from "./BudgetSummary";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import { CSVLink } from "react-csv";
import { TripContext } from "../context/TripContext";

const PREDEFINED_CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Entertainment"];

function BudgetPage() {
  const { budget, setBudget, expenses, setExpenses, travelers } = useContext(TripContext); 
  const [categories, setCategories] = useState([...PREDEFINED_CATEGORIES]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showExpenses, setShowExpenses] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false); // 

  const handleExpenseSubmit = (expense) => {
    if (expense.id) {
      setExpenses(prev => prev.map(exp => exp.id === expense.id ? expense : exp));
    } else {
      setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
    }

    setEditingExpense(null);

    if (expense.category && !categories.includes(expense.category)) {
      setCategories([...categories, expense.category]);
    }
  };

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const totalSpending = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const perHead = travelers > 0 ? (totalSpending / travelers).toFixed(2) : "N/A";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-2 border-blue-300 rounded-2xl shadow-xl mb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="bg-blue-800 text-white px-6 py-4 rounded font-bold text-xl shadow">
          Budget (Track your Expenses)
        </h1>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-bold shadow transition text-lg"
          onClick={() => setEditingExpense({})}
        >
          + Add expense
        </button>
      </div>

      {/* Budget Summary */}
      <BudgetSummary
        budget={budget}
        setBudget={setBudget}
        expenses={expenses}
      />

      {/* Expense Form */}
      <ExpenseForm
        key={editingExpense ? editingExpense.id : "new"}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleExpenseSubmit}
        editingExpense={editingExpense}
        onCancel={() => setEditingExpense(null)}
      />

      {/* Toggle + Download */}
      <div className="flex gap-4 mb-4">
        <button
          className="border-2 border-blue-400 bg-white text-blue-800 font-semibold px-8 py-2 rounded hover:bg-blue-50 hover:border-blue-600 transition text-lg"
          onClick={() => setShowExpenses(prev => !prev)}
        >
          Expenses
        </button>
        <CSVLink
          data={expenses}
          filename="trip_expenses.csv"
          className="border-2 border-green-500 bg-green-100 text-green-800 font-semibold px-8 py-2 rounded hover:bg-green-200 hover:border-green-600 transition text-lg"
        >
          Download as CSV
        </CSVLink>
      </div>

      {/* Expense List */}
      {showExpenses && (
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Extra Controls */}
      <div className="flex gap-4 mt-6">
        <button
          className="border-2 border-blue-400 bg-blue-200 text-blue-900 font-semibold px-8 py-2 rounded shadow hover:bg-blue-300 hover:border-blue-600 transition text-lg"
          onClick={() => setShowChart(prev => !prev)}
        >
          {showChart ? "Hide Breakdown" : "Breakdown of Expenses"}
        </button>

        <button
          onClick={() => setShowSplitModal(true)}
          className="border-2 border-blue-400 bg-blue-200 text-blue-900 font-semibold px-8 py-2 rounded shadow hover:bg-blue-300 hover:border-blue-600 transition text-lg"
        >
          Split the Expenses
        </button>
      </div>

      {/* Conditional Chart Section */}
      {showChart && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center text-black">Spending Breakdown</h3>
          <div className="flex justify-center">
            <ExpenseChart data={expenses} />
          </div>
        </div>
      )}

      {/* Expense Split Modal */}
      {showSplitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center text-black">
            <h2 className="text-2xl font-extrabold mb-4 text-blue-900">Split Summary</h2>

            <div className="space-y-3 text-lg font-medium">
              <p className="text-gray-800">
                Total Spending: <span className="text-green-700 font-bold">₹{totalSpending.toFixed(2)}</span>
              </p>
              <p className="text-gray-800">
                Number of Travelers: <span className="text-green-700 font-bold">{travelers || "N/A"}</span>
              </p>
              <p className="text-gray-800">
                Each Person Pays: <span className="text-green-700 font-bold">₹{perHead}</span>
              </p>
            </div>

            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
              onClick={() => setShowSplitModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetPage;
