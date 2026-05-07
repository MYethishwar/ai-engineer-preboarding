import { useState, useEffect } from "react";

function Dashboard() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  async function fetchDashboard() {
    try {
      const res = await fetch("http://localhost:8000/dashboard");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-gray-300">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-gray-400">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            Dashboard
          </h1>

          <p className="text-gray-400">
            Real-time smart energy monitoring
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-blue-500/10 border border-blue-500/20 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-blue-300 text-sm">Grid Power</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {data.grid_power_kw} kW
            </h2>

            <p className="text-blue-200 text-sm mt-2 capitalize">
              {data.grid_status}
            </p>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-teal-300 text-sm">Solar Generation</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {data.solar_generation_kw} kW
            </h2>

            <p className="text-teal-200 text-sm mt-2 capitalize">
              {data.solar_status}
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-orange-300 text-sm">Net Consumption</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {data.net_consumption_kw} kW
            </h2>

            <p className="text-orange-200 text-sm mt-2">
              Current draw
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-green-300 text-sm">Battery Level</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {data.battery_percent}%
            </h2>

            <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: `${data.battery_percent}%` }}
              />
            </div>
          </div>

        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {[
            ["Today's Usage", `${data.today_usage_kwh} kWh`],
            ["Today's Solar", `${data.today_solar_kwh} kWh`],
            ["Today's Cost", `₹${data.today_cost_inr}`],
            ["CO₂ Saved", `${data.co2_saved_kg} kg`]
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-5"
            >
              <p className="text-gray-400 text-sm">
                {item[0]}
              </p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {item[1]}
              </h3>
            </div>
          ))}

        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-5">
             Energy Flow
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between text-gray-300">
                <span>Grid → Home</span>
                <span className="text-blue-300 font-bold">
                  {data.grid_power_kw} kW
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Solar → Home</span>
                <span className="text-teal-300 font-bold">
                  {data.solar_generation_kw} kW
                </span>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4 text-white font-semibold">
                <span>Net Usage</span>
                <span className="text-orange-300">
                  {data.net_consumption_kw} kW
                </span>
              </div>

            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-5">
              Sustainability
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between text-gray-300">
                <span>Solar Coverage</span>

                <span className="text-teal-300 font-bold">
                  {((data.solar_generation_kw / data.grid_power_kw) * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>CO₂ Saved</span>

                <span className="text-green-300 font-bold">
                  {data.co2_saved_kg} kg
                </span>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4 text-white font-semibold">
                <span>Battery Status</span>

                <span className="text-green-300">
                  {data.battery_percent}% charged
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;