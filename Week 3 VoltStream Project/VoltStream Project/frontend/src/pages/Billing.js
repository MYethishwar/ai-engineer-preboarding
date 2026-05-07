import { useState, useEffect } from "react";

function Billing() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBilling();
  }, []);

  async function fetchBilling() {
    try {
      const res = await fetch("http://localhost:8000/billing");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching billing:", err);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading billing analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-xl rounded-2xl p-8">
          <p className="text-red-300 text-lg">Failed to load billing data</p>
        </div>
      </div>
    );
  }

  const budgetColor =
    data.budget_used_percent > 90
      ? "bg-red-500"
      : data.budget_used_percent > 70
      ? "bg-orange-500"
      : "bg-teal-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">

      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>

        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>

        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-white mb-3">
              Billing & Expenses
            </h1>

            <p className="text-gray-400 text-lg">
              Monitor energy costs, solar savings, and monthly budget usage
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <div className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-6 hover:scale-105 transition duration-300">
              <p className="text-orange-300 text-sm uppercase tracking-wide font-semibold">
                This Month
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                ₹{data.current_month_cost_inr}
              </h2>

              <p className="text-orange-200 text-sm mt-2">
                {data.current_month_kwh} kWh consumed
              </p>
            </div>

            <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 hover:scale-105 transition duration-300">
              <p className="text-blue-300 text-sm uppercase tracking-wide font-semibold">
                Projected Bill
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                ₹{data.projected_month_cost_inr}
              </h2>

              <p className="text-blue-200 text-sm mt-2">
                Estimated month-end cost
              </p>
            </div>

            <div className="bg-slate-500/10 backdrop-blur-xl border border-slate-400/20 rounded-3xl p-6 hover:scale-105 transition duration-300">
              <p className="text-slate-300 text-sm uppercase tracking-wide font-semibold">
                Last Month
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                ₹{data.last_month_cost_inr}
              </h2>

              <p className="text-slate-200 text-sm mt-2">
                {data.current_month_cost_inr < data.last_month_cost_inr
                  ? "Lower than last month"
                  : " Higher than last month"}
              </p>
            </div>

            <div className="bg-teal-500/10 backdrop-blur-xl border border-teal-500/20 rounded-3xl p-6 hover:scale-105 transition duration-300">
              <p className="text-teal-300 text-sm uppercase tracking-wide font-semibold">
                Solar Savings
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                ₹{data.solar_savings_inr}
              </h2>

              <p className="text-teal-200 text-sm mt-2">
                Saved through solar generation
              </p>
            </div>

          </div>

          {/* Budget Tracker */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Budget Tracker
                </h3>

                <p className="text-gray-400 mt-1">
                  Monthly spending and consumption analysis
                </p>
              </div>

              <span
                className={`text-sm font-semibold px-4 py-2 rounded-full ${
                  data.budget_used_percent > 90
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : data.budget_used_percent > 70
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                }`}
              >
                {data.budget_used_percent}% Used
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>₹0</span>
              <span>Budget Limit: ₹{data.budget_inr}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">
              <div
                className={`${budgetColor} h-5 rounded-full transition-all duration-500`}
                style={{ width: `${data.budget_used_percent}%` }}
              />
            </div>

            <div className="flex justify-between text-sm mt-4 text-gray-300">
              <span>Spent: ₹{data.current_month_cost_inr}</span>

              <span>
                Remaining: ₹{data.budget_inr - data.current_month_cost_inr}
              </span>
            </div>

            {data.budget_used_percent > 80 && (
              <div className="mt-6 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-xl">
                <p className="text-orange-300 font-semibold">
                  Budget Alert: You have already used{" "}
                  {data.budget_used_percent}% of your monthly budget.
                </p>
              </div>
            )}
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white">
                Expense Breakdown
              </h3>

              <p className="text-gray-400 mt-1">
                Device-level electricity usage analysis
              </p>
            </div>

            <div className="space-y-6">
              {data.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition duration-300"
                >

                  <div className="flex justify-between items-center mb-3">

                    <div>
                      <p className="text-white font-semibold text-lg">
                        {item.category}
                      </p>

                      <p className="text-gray-400 text-sm">
                        {item.kwh} kWh consumed
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-orange-300 font-bold text-xl">
                        ₹{item.cost_inr}
                      </p>

                      <p className="text-teal-300 text-sm font-semibold">
                        {item.percent}%
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-orange-400 h-3 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-white/10 pt-6 mt-8">
              <span className="text-2xl font-bold text-white">
                Total This Month
              </span>

              <span className="text-3xl font-bold text-orange-400">
                ₹{data.current_month_cost_inr}
              </span>
            </div>
          </div>

          {/* Rate Info */}
          <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-gray-300 text-lg">
              Current electricity rate:
              <span className="text-teal-300 font-bold ml-2">
                ₹{data.rate_per_kwh} per kWh
              </span>
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }

          33% {
            transform: translate(30px, -50px) scale(1.1);
          }

          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 8s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Billing;