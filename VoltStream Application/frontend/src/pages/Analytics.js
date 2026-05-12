import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import React from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
function Analytics() {

  const [period, setPeriod] = useState("daily");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, [period]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/analytics?period=${period}`);
      const json = await res.json();
      setData(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setData([]);
    }
    setLoading(false);
  }

  // summary calculations
  const totalUsage = data.reduce((sum, d) => sum + (d.usage || 0), 0).toFixed(1);
  const totalSolar = data.reduce((sum, d) => sum + (d.solar || 0), 0).toFixed(1);
  const totalCost = data.reduce((sum, d) => sum + (d.cost || 0), 0).toFixed(0);

  const solarPercent = totalUsage > 0
    ? ((totalSolar / totalUsage) * 100).toFixed(0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">

      {/* Animated Background */}
      {/* <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>

        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>

        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-white mb-3">
              Energy Analytics
            </h1>

            <p className="text-gray-400 text-lg">
              Historical energy consumption and solar generation insights
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mb-10">
            {["daily", "weekly", "monthly"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-300 backdrop-blur-lg border ${
                  period === p
                    ? "bg-gradient-to-r from-teal-500 to-orange-500 text-white border-transparent shadow-lg shadow-teal-500/30"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-teal-400/50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition duration-300">
              <p className="text-blue-300 text-sm uppercase tracking-wide font-semibold">
                Total Usage
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {totalUsage}
                <span className="text-lg text-blue-200 ml-2">kWh</span>
              </h2>
            </div>

            <div className="bg-teal-500/10 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6 hover:scale-105 transition duration-300">
              <p className="text-teal-300 text-sm uppercase tracking-wide font-semibold">
                Solar Generated
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {totalSolar}
                <span className="text-lg text-teal-200 ml-2">kWh</span>
              </h2>
            </div>

            <div className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 hover:scale-105 transition duration-300">
              <p className="text-orange-300 text-sm uppercase tracking-wide font-semibold">
                Total Cost
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                ₹{totalCost}
              </h2>
            </div>

            <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 hover:scale-105 transition duration-300">
              <p className="text-green-300 text-sm uppercase tracking-wide font-semibold">
                Solar Coverage
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {solarPercent}
                <span className="text-lg text-green-200 ml-2">%</span>
              </h2>
            </div>

          </div>

          {/* Main Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Energy Usage vs Solar Generation
                </h3>

                <p className="text-gray-400 mt-1 capitalize">
                  {period} energy overview
                </p>
              </div>

              <div className="px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/20 text-teal-300 text-sm">
                Live Analytics
              </div>
            </div>

            {loading ? (
              <div className="h-[350px] flex items-center justify-center text-gray-400 text-lg">
                Loading analytics...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                  />

                  <YAxis
                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#fff"
                    }}
                  />

                  <Legend />

                  <Bar
                    dataKey="usage"
                    name="Usage (kWh)"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                  />

                  <Bar
                    dataKey="solar"
                    name="Solar (kWh)"
                    fill="#14b8a6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Cost Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white">
                Monthly Cost Trend
              </h3>

              <p className="text-gray-400 mt-1">
                Energy spending insights and projections
              </p>
            </div>

            {loading ? (
              <div className="h-[250px] flex items-center justify-center text-gray-400 text-lg">
                Loading cost data...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                  />

                  <YAxis
                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                  />

                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Cost"]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#fff"
                    }}
                  />

                  <Bar
                    dataKey="cost"
                    name="Cost (₹)"
                    fill="#f97316"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
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

export default Analytics;