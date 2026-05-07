import { useState, useEffect } from "react";

// Icon map
const deviceIcons = {
  ac: "❄️",
  fan: "🌀",
  washer: "🫧",
  fridge: "🧊",
  heater: "🔥",
  tv: "📺",
};

function Devices() {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices();
  }, []);

  async function fetchDevices() {
    try {
      const res = await fetch("http://localhost:8000/devices");
      const data = await res.json();
      setDevices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setDevices([]);
    }
    setLoading(false);
  }

  async function toggleDevice(id, currentStatus) {
    try {
      await fetch(`http://localhost:8000/devices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !currentStatus })
      });

      setDevices(prev =>
        prev.map(d =>
          d.id === id ? { ...d, status: !currentStatus } : d
        )
      );

    } catch (err) {
      console.error("Error toggling device:", err);
    }
  }

  const activeDevices = devices.filter(d => d.status).length;

  const activePower = devices
    .filter(d => d.status)
    .reduce((sum, d) => sum + d.power_w, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-gray-300">
        Loading devices...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            Smart Devices
          </h1>

          <p className="text-gray-400">
            Monitor and control your home appliances
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-teal-500/10 border border-teal-500/20 backdrop-blur-lg rounded-2xl p-5">
            <p className="text-teal-300 text-sm">Active Devices</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {activeDevices}/{devices.length}
            </h2>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 backdrop-blur-lg rounded-2xl p-5">
            <p className="text-orange-300 text-sm">Current Load</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {(activePower / 1000).toFixed(2)} kW
            </h2>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 backdrop-blur-lg rounded-2xl p-5">
            <p className="text-blue-300 text-sm">Hourly Cost</p>

            <h2 className="text-4xl font-bold text-white mt-2">
              ₹{((activePower / 1000) * 9.5).toFixed(1)}
            </h2>
          </div>

        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          {devices.map(device => (

            <div
              key={device.id}
              className={`backdrop-blur-lg rounded-2xl p-5 border transition ${
                device.status
                  ? "bg-teal-500/10 border-teal-400/30"
                  : "bg-white/5 border-white/10"
              }`}
            >

              <div className="flex justify-between mb-5">

                <div>
                  <div className="text-4xl">
                    {deviceIcons[device.icon] || "🔌"}
                  </div>

                  <h3 className="text-white font-semibold mt-3">
                    {device.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {device.room}
                  </p>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full h-fit ${
                  device.status
                    ? "bg-teal-400/20 text-teal-300"
                    : "bg-slate-700 text-gray-300"
                }`}>
                  {device.status ? "ON" : "OFF"}
                </span>

              </div>

              <p className="text-gray-300 text-sm mb-4">
                {device.power_w}W
              </p>

              <button
                onClick={() => toggleDevice(device.id, device.status)}
                className={`w-full py-2 rounded-xl font-semibold transition ${
                  device.status
                    ? "bg-teal-500 hover:bg-teal-600 text-white"
                    : "bg-white/10 hover:bg-white/20 text-gray-200"
                }`}
              >
                {device.status ? "Turn OFF" : "Turn ON"}
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Devices;