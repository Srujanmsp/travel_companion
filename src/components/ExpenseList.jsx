function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0)
    return (
      <div className="text-gray-700 font-semibold p-4">
        No expenses added yet.
      </div>
    );
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-blue-200 rounded-xl bg-white shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="border-b-2 border-blue-200 px-4 py-2 text-black font-bold">
              Name
            </th>
            <th className="border-b-2 border-blue-200 px-4 py-2 text-black font-bold">
              Amount
            </th>
            <th className="border-b-2 border-blue-200 px-4 py-2 text-black font-bold">
              Category
            </th>
            <th className="border-b-2 border-blue-200 px-4 py-2 text-black font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} className="hover:bg-blue-50">
              <td className="border-b border-blue-100 px-4 py-2 font-medium text-black">
                {exp.name}
              </td>
              <td className="border-b border-blue-100 px-4 py-2 font-medium text-black">
                Rs {exp.amount}
              </td>
              <td className="border-b border-blue-100 px-4 py-2 font-medium text-black">
                {exp.category}
              </td>
              <td className="border-b border-blue-100 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 font-semibold shadow hover:bg-blue-600 transition"
                  onClick={() => onEdit(exp)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded font-semibold shadow hover:bg-red-600 transition"
                  onClick={() => onDelete(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExpenseList;
