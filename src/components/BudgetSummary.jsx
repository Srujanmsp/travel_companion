import React, { useState } from "react";

function BudgetSummary({ budget, setBudget, expenses }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const totalBudget =
    (budget?.transport || 0) +
    (budget?.accommodation || 0) +
    (budget?.food || 0) +
    (budget?.misc || 0);

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const handleSave = () => {
    const num = Number(inputValue);
    if (!isNaN(num) && num >= 0) {
      // Distribute the budget equally or however you like
      const equalShare = Number((num / 4).toFixed(2));
      setBudget({
        transport: equalShare,
        accommodation: equalShare,
        food: equalShare,
        misc: equalShare,
      });
      setEditing(false);
      setInputValue("");
    }
  };

  const handleReset = () => {
    setBudget({ transport: 0, accommodation: 0, food: 0, misc: 0 });
    setInputValue("");
    setEditing(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold text-blue-800">
          Rs {totalBudget.toFixed(1)}
        </div>
        {editing ? (
          <>
            <input
              className="border-2 border-blue-400 px-4 py-2 rounded font-semibold text-blue-900 focus:outline-none focus:border-blue-600 w-32"
              type="number"
              placeholder="Enter total budget"
              value={inputValue}
              min={0}
              onChange={e => setInputValue(e.target.value)}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow transition"
              onClick={handleSave}
              disabled={inputValue === "" || isNaN(Number(inputValue))}
            >
              Save
            </button>
          </>
        ) : (
          <>
            {totalBudget === 0 && (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow transition"
                onClick={() => setEditing(true)}
              >
                Set Budget
              </button>
            )}
            {totalBudget > 0 && (
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold shadow transition"
                onClick={handleReset}
              >
                Reset Budget
              </button>
            )}
          </>
        )}
      </div>
      <div className="mt-2 text-base text-gray-800 font-medium">
        Total Expenses: <b className="text-blue-700">Rs {totalExpenses.toFixed(1)}</b> | Balance:{" "}
        <b className="text-green-700">Rs {(totalBudget - totalExpenses).toFixed(1)}</b>
      </div>
    </div>
  );
}

export default BudgetSummary;
