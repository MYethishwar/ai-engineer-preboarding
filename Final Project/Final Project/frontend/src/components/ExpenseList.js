// ExpenseList.js
import React, { useState } from "react";

function ExpenseList({ expenses = [], onExpensesChange }) {

  // local state for adding new expense
  const [newItem, setNewItem]       = useState("");
  const [newAmount, setNewAmount]   = useState("");

  // add expense to list
  function handleAddExpense() {
    if (!newItem || !newAmount) {
      alert("Item and amount required!");
      return;
    }

    const newExpense = {
      item: newItem,
      amount: parseFloat(newAmount),
      currency: "INR"
    };

    const currentExpenses = Array.isArray(expenses) ? expenses : [];
    const updated = [...currentExpenses, newExpense];
    onExpensesChange(updated);

    setNewItem("");
    setNewAmount("");
  }

  // remove expense by index
  function handleRemove(index) {
    const currentExpenses = Array.isArray(expenses) ? expenses : [];
    const updated = currentExpenses.filter((_, i) => i !== index);
    onExpensesChange(updated);
  }

  // calculate total
  const expensesArray = Array.isArray(expenses) ? expenses : [];
  const total = expensesArray.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">

      <h3 className="font-semibold text-gray-800 mb-4">💰 Expenses</h3>

      {/* add expense form */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Item (e.g., boating)"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <button
          onClick={handleAddExpense}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600"
        >
          Add
        </button>
      </div>

      {/* expenses list */}
      {expensesArray.length === 0 ? (
        <p className="text-gray-400 text-sm">No expenses added yet</p>
      ) : (
        <div className="space-y-2 mb-4">
          {expensesArray.map((exp, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">{exp.item}</p>
                <p className="text-xs text-gray-400">₹ {exp.amount}</p>
              </div>
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* total */}
      {expensesArray.length > 0 && (
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-teal-600">₹ {total.toFixed(2)}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default ExpenseList;