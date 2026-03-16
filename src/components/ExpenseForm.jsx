import React, { useState, useEffect } from "react";

function ExpenseForm({
  categories,
  setCategories,
  onSubmit,
  editingExpense,
  onCancel
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [otherCategory, setOtherCategory] = useState("");

  useEffect(() => {
    if (editingExpense && editingExpense.id) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setShowOther(!categories.includes(editingExpense.category));
      setOtherCategory(!categories.includes(editingExpense.category) ? editingExpense.category : "");
    } else {
      setName("");
      setAmount("");
      setCategory("");
      setShowOther(false);
      setOtherCategory("");
    }
  }, [editingExpense, categories]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (value === "Other") {
      setShowOther(true);
      setOtherCategory("");
    } else {
      setShowOther(false);
      setOtherCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCategory = category;
    if (category === "Other" && otherCategory.trim()) {
      finalCategory = otherCategory.trim();
      if (!categories.includes(finalCategory)) {
        setCategories([...categories, finalCategory]);
      }
    }
    if (!name || !amount || !finalCategory) return;
    onSubmit({
      id: editingExpense && editingExpense.id,
      name,
      amount: Number(amount),
      category: finalCategory
    });
    setName("");
    setAmount("");
    setCategory("");
    setShowOther(false);
    setOtherCategory("");
  };

  if (!editingExpense) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6 items-center bg-blue-50 border-2 border-blue-200 rounded-xl p-4 shadow">
      <input
        className="border-2 border-blue-400 bg-white px-2 py-1 rounded w-32 font-semibold text-blue-900 focus:outline-none focus:border-blue-600"
        placeholder="Expense Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border-2 border-blue-400 bg-white px-2 py-1 rounded w-20 font-semibold text-blue-900 focus:outline-none focus:border-blue-600"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <select
        className="border-2 border-blue-400 bg-white px-2 py-1 rounded font-semibold text-blue-900 focus:outline-none focus:border-blue-600"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        <option value="Other">Other</option>
      </select>
      {showOther && (
        <input
          className="border-2 border-blue-400 bg-white px-2 py-1 rounded w-28 font-semibold text-blue-900 focus:outline-none focus:border-blue-600"
          placeholder="New Category"
          value={otherCategory}
          onChange={e => setOtherCategory(e.target.value)}
        />
      )}
      <button
        className="bg-green-600 text-white px-4 py-1 rounded font-bold shadow hover:bg-green-700 transition"
        type="submit"
      >
        {editingExpense && editingExpense.id ? "Update" : "Add"}
      </button>
      <button
        className="text-gray-700 border-2 border-gray-400 px-3 py-1 rounded font-semibold bg-gray-100 hover:bg-gray-200 transition"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default ExpenseForm;
