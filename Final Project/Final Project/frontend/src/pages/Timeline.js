// Timeline.js
// Home page showing all trips with search

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard";

function Timeline() {

  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // fetch all trips on load
  useEffect(() => {
    fetchTrips();
  }, []);

  // filter trips when search changes
  useEffect(() => {
    if (!search) {
      setFilteredTrips(trips);
    } else {
      const results = trips.filter(trip =>
        trip.location.toLowerCase().includes(search.toLowerCase()) ||
        trip.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTrips(results);
    }
  }, [search, trips]);

  // GET all journals from FastAPI
  async function fetchTrips() {
    // CORRECT ✅
    const res = await fetch("http://localhost:8000/journals");
    const data = await res.json();
    
    // sort by date descending (newest first)
    // CORRECT ✅
    const sorted = data.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
    setTrips(sorted);
    setFilteredTrips(sorted);
  }

  // DELETE a journal entry
  async function deleteTrip(id) {
    await fetch("http://localhost:8000/journals/" + id, { method: "DELETE" });
    fetchTrips();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Travel Journal</h1>
        <p className="text-gray-500 mt-1">All your adventures in one place</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="text-teal-600 text-sm font-semibold">Total Trips</p>
          <p className="text-2xl font-bold text-teal-700 mt-1">{trips.length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-orange-600 text-sm font-semibold">Total Spent</p>
          <p className="text-2xl font-bold text-orange-700 mt-1">
            ₹ {trips.reduce((sum, t) => sum + (t.total_expense || 0), 0).toFixed(0)}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <button
            onClick={() => navigate("/journal")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold"
          >
            + New Entry
          </button>
        </div>
      </div>
      

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by location or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} found
      </p>

      {/* Empty state */}
      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No trips found</p>
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
  );
}

export default Timeline;