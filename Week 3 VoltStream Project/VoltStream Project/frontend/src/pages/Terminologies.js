function Terminologies() {

  const terms = [
    {
      title: "Grid Power",
      desc: "Electricity supplied from the utility grid to power the home."
    },
    {
      title: "Solar Generation",
      desc: "Energy produced through rooftop solar panels in real time."
    },
    {
      title: "Net Consumption",
      desc: "Final electricity usage after subtracting solar generation."
    },
    {
      title: "Battery Level",
      desc: "Current percentage of stored backup energy available."
    },
    {
      title: "Energy Flow",
      desc: "Movement of electricity between the grid, solar system, and home."
    },
    {
      title: "Solar Coverage",
      desc: "Percentage of total electricity demand fulfilled by solar energy."
    },
    {
      title: "CO₂ Saved",
      desc: "Estimated carbon emissions reduced through renewable energy usage."
    },
    {
      title: "Current Load",
      desc: "Total active power currently consumed by running devices."
    },
    {
      title: "Smart Devices",
      desc: "Connected appliances that can be remotely monitored and controlled."
    },
    {
      title: "Active Devices",
      desc: "Number of appliances currently powered ON in the system."
    },
    {
      title: "Hourly Cost",
      desc: "Estimated electricity expense generated every hour."
    },
    {
      title: "Energy Analytics",
      desc: "Historical analysis of energy usage and solar generation patterns."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            VoltStream Terminologies
          </h1>

          <p className="text-gray-400 text-lg">
            Key concepts used throughout the VoltStream energy platform
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {terms.map((term, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10
              backdrop-blur-lg rounded-2xl p-6
              hover:border-teal-400/30 hover:bg-white/10
              transition duration-300"
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-orange-300 mb-3">
                {term.title}
              </h2>

              <p className="text-gray-300 leading-relaxed">
                {term.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Terminologies;