import { useState, useEffect } from "react";

function ExpensesBreakdown() {

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    const res = await fetch("http://localhost:8000/journals");
    const data = await res.json();
    setTrips(data);
  }

  // collect all expenses
  const allExpenses = [];
  trips.forEach(trip => {
    if (trip.expenses) {
      trip.expenses.forEach(exp => {
        allExpenses.push({
          ...exp,
          tripTitle: trip.title,
          tripId: trip.id
        });
      });
    }
  });

  // group by category
  const expensesByCategory = {};
  allExpenses.forEach(exp => {
    if (!expensesByCategory[exp.item]) {
      expensesByCategory[exp.item] = [];
    }
    expensesByCategory[exp.item].push(exp);
  });

  // total calculations
  const totalExpense = allExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  
  const categoryTotals = {};
  Object.keys(expensesByCategory).forEach(category => {
    categoryTotals[category] = expensesByCategory[category].reduce((sum, exp) => sum + (exp.amount || 0), 0);
  });

  // sort by total amount
  const sortedCategories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);

  return (
  <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">

    <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Expenses Breakdown</h1>
    <p className="text-gray-500 mb-8">Detailed breakdown of all your trip expenses</p>

    {/* TOTAL STATS */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      
      <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-6 shadow-sm border border-orange-200">
        <p className="text-orange-700 text-sm font-semibold">Total Spent</p>
        <p className="text-3xl font-bold text-orange-900 mt-2">₹{totalExpense.toFixed(0)}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-6 shadow-sm border border-blue-200">
        <p className="text-blue-700 text-sm font-semibold">Total Expenses</p>
        <p className="text-3xl font-bold text-blue-900 mt-2">{allExpenses.length}</p>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-6 shadow-sm border border-purple-200">
        <p className="text-purple-700 text-sm font-semibold">Categories</p>
        <p className="text-3xl font-bold text-purple-900 mt-2">{sortedCategories.length}</p>
      </div>

    </div>

    {/* EXPENSES BY CATEGORY */}
    {sortedCategories.length > 0 ? (
      <div className="space-y-6">
        {sortedCategories.map(category => (
          <div key={category} className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 shadow-md p-6">

            {/* CATEGORY HEADER */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 capitalize">{category}</h3>
              <span className="text-2xl font-bold text-teal-700">
                ₹{categoryTotals[category].toFixed(0)}
              </span>
            </div>

            {/* EXPENSES IN THIS CATEGORY */}
            <div className="space-y-3">
              {expensesByCategory[category].map((exp, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-sm transition">

                  <div>
                    <p className="font-medium text-gray-900">{exp.tripTitle}</p>
                    <p className="text-xs text-gray-500">₹{exp.amount}</p>
                  </div>

                  <span className="text-sm font-medium text-gray-600">
                    {exp.currency || 'INR'}
                  </span>

                </div>
              ))}
            </div>

            {/* CATEGORY PERCENTAGE */}
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(categoryTotals[category] / totalExpense) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((categoryTotals[category] / totalExpense) * 100).toFixed(1)}% of total
              </p>
            </div>

          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 text-gray-400">
        <p>No expenses recorded. Add trips with expenses to see breakdown!</p>
      </div>
    )}

  </div>
);
}
export default ExpensesBreakdown;