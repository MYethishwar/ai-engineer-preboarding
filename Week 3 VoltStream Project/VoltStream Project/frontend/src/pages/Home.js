import { useEffect, useState } from "react";     //page loads, state changes, component updates, component unmounts.
import { useNavigate } from "react-router-dom";

function Home() { 

  const navigate = useNavigate();   //page navigation
  const [showSplash, setShowSplash] = useState(
  !sessionStorage.getItem("voltstreamSplashShown")
);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen overflow-hidden">

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center
        bg-slate-950 animate-fadeOut">

          <div className="text-center">

            <h1 className="text-7xl font-bold text-transparent bg-clip-text
            bg-gradient-to-r from-teal-400 to-orange-400 animate-pulse">
                VoltStream
            </h1>

            <p className="text-gray-300 text-2xl mt-5 tracking-wide">
                         Welcome to Smart Energy Intelligence!
            </p>

          </div>

        </div>
      )}

      {/* Background Blobs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl animate-blob"></div>

        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex justify-between items-center w-full px-0 py-6 max-w-7xl mx-auto ">

          <div className="flex items-center gap-3">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-400">
              ⚡VoltStream
            </span>
          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/terminologies")}
              className="px-5 py-2 rounded-xl 
              bg-white/5 border border-white/10 backdrop-blur-lg
              text-gray-200 font-semibold
              hover:border-teal-400/40 hover:bg-white/10
              transition duration-300"
            >
              Terminologies
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-12 py-4 rounded-2xl 
              bg-gradient-to-r from-teal-500 to-orange-500 
              text-white font-semibold
              hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30
              transition duration-300"
            >
              Launch Dashboard
            </button>

          </div>

        </nav>
  <div className="h-[1px] w-full 
bg-gradient-to-r from-transparent via-teal-400/40 to-transparent
shadow-[0_0_25px_rgba(45,212,191,0.3.5)]">

</div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-8 py-20 -mt-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8">

              <div>
                <h1 className="text-6xl font-bold text-white leading-tight mb-4">
                  Smart Energy <br />

                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-orange-400 to-teal-400">
                    For Your Home
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  VoltStream is a modern energy monitoring platform for smart homes and renewable energy management.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">

                <h3 className="text-xl font-semibold text-white">
                  What You Can Do
                </h3>

                {[
                  ["Real-Time Monitoring", "Track grid power and solar generation live"],
                  ["Energy Analytics", "Analyze daily and monthly usage trends"],
                  ["Smart Device Control", "Control connected home appliances remotely"],
                  ["Budget Management", "Monitor electricity cost and projections"]
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-xl p-4
                    backdrop-blur-lg hover:border-teal-400/40 transition"
                  >
                    <p className="text-white font-semibold">
                      {item[0]}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {item[1]}
                    </p>
                  </div>
                ))}

              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 rounded-xl
                bg-gradient-to-r from-teal-500 to-orange-500
                text-white font-semibold text-lg
                hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30
                transition duration-300"
              >
                Enter VoltStream Dashboard →
              </button>

            </div>

            {/* Right Card */}
            <div className="relative -mt-32">

              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-3xl blur-3xl"></div>

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                <p className="text-sm uppercase tracking-wider text-gray-400 mb-6">
                  Live Energy Flow
                </p>

                <div className="space-y-4">

                  {[
                    ["Grid Power", "3.4 kW", "blue"],
                    ["Solar Generation", "2.1 kW", "teal"],
                    ["Net Consumption", "1.3 kW", "orange"],
                    ["Battery Level", "72%", "green"]
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center p-4 rounded-xl
                      border backdrop-blur-lg
                      ${
                        item[2] === "blue"
                          ? "bg-blue-500/10 border-blue-500/30"
                          : item[2] === "teal"
                          ? "bg-teal-500/10 border-teal-500/30"
                          : item[2] === "orange"
                          ? "bg-orange-500/10 border-orange-500/30"
                          : "bg-green-500/10 border-green-500/30"
                      }`}
                    >
                      <span className="text-white font-semibold">
                        {item[0]}
                      </span>

                      <span className="text-2xl font-bold text-white">
                        {item[1]}
                      </span>
                    </div>
                  ))}

                </div>

                {/* Status */}
                <div className="pt-6 mt-6 border-t border-white/10 flex gap-6">

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

                    <span className="text-sm text-gray-300">
                      Grid Connected
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>

                    <span className="text-sm text-gray-300">
                      Solar Active
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto px-8 py-12 border-t border-white/10">

          <div className="grid grid-cols-3 gap-8 text-center">

            <div>
              <p className="text-3xl font-bold text-teal-300">4</p>
              <p className="text-sm text-gray-400 mt-1">Core Features</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-orange-300">8</p>
              <p className="text-sm text-gray-400 mt-1">Smart Devices</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-300">Real-Time</p>
              <p className="text-sm text-gray-400 mt-1">Live Updates</p>
            </div>

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

        @keyframes fadeOut {
        
          70% {
            opacity: 1;
            filter: blur(0px);
          }

          100% {
            opacity: 0;
            filter: blur(18px);
            transform: scale(2.6);
          }
        }

        .animate-blob {
          animation: blob 2s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fadeOut {
          animation: fadeOut 3s ease forwards;
        }
      `}</style>

    </div>
  );
}

export default Home;