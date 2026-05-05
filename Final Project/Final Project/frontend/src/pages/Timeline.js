import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard";
import IndiaMap from "../components/IndiaMap";

function Timeline() {

  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    if (!search) {      //if search is empty then show all trips
      setFilteredTrips(trips);
    } else {
      const results = trips.filter(trip =>   //filters trips based on location or title
        trip.location.toLowerCase().includes(search.toLowerCase()) ||
        trip.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTrips(results);
    }
  }, [search, trips]);

  async function fetchTrips() {
    const res = await fetch("http://localhost:8000/journals");
    const data = await res.json();

    const sorted = data.sort((a, b) => new Date(b.date_start) - new Date(a.date_start)); //sorts in chronological order
    setTrips(sorted);
    setFilteredTrips(sorted);
  }

  async function deleteTrip(id) {
    await fetch("http://localhost:8000/journals/" + id, { method: "DELETE" });
    fetchTrips();
  }

  return (
    <div className="bg-gradient-to-br from-green-100 to-black-50 min-h-screen">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-teal-900">
            Welcome to Your Travel Journal...
          </h1>
          <p className="text-teal-600 mt-1">
Manage your travel life end-to-end — plan destinations, track expenses, document experiences, and visualize your journeys on a map. Everything you need to organize and relive your trips in one platform.          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">

          <div className="bg-white border border-teal-200 p-4 rounded-lg shadow-sm">
            <p className="text-teal-600 text-m font-semibold">Total Trips: </p>
            <p className="text-3xl font-bold text-teal-800 mt-1">{trips.length} trips</p>
          </div>

          <div className="bg-white border border-teal-200 p-4 rounded-lg shadow-sm">
            <p className="text-teal-600 text-m font-semibold">Total Spent:</p>
            <p className="text-3xl font-bold text-teal-800 mt-1">
              ₹ {trips.reduce((sum, t) => sum + (t.total_expense || 0), 0).toFixed(0)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/journal")}
              className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-gray-600 text-sm font-semibold shadow-sm"
            >
              + New Entry
            </button>
            <button
              onClick={() => navigate("/wishlist")}
              className="flex-1 bg-cyan-500 text-white py-2 rounded-lg hover:bg-gray-600 text-sm font-semibold shadow-sm"
            >
              Wishlist
            </button>
          </div>

        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-2 gap-10">

          {/* LEFT SIDE — TRIPS */}
          <div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by location or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:border-teal-800 bg-white"
              />
            </div>

            {/* Results count */}
            <p className="text-sm text-teal-600 mb-4">
              {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} found
            </p>

            {/* Empty state */} 
            {filteredTrips.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-teal-200 shadow-sm">
                <p className="text-teal-400 text-lg">No trips found</p>
                <button
                  onClick={() => navigate("/journal")}
                  className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600"
                >
                  Create your first entry
                </button>
              </div>
            )}

            {/* Trip list */}
            {filteredTrips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={deleteTrip}
              />
            ))}

          </div>

          {/* RIGHT SIDE — MAP */}
          <div>
           <div className="sticky top-6  bg-teal-700 border border-teal-500 rounded-xl shadow-md p-3">
              <IndiaMap trips={trips} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Timeline;