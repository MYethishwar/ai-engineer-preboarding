// Timeline.js — Home page at /
// Shows: greeting + 3 stat cards + trip list
// If no trips → shows empty state with button

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard";

function Timeline() {

  // trips state — all trips from MongoDB
  const [trips, setTrips] = useState([]);

  // useNavigate — lets us go to /add page programmatically
  const navigate = useNavigate();

  // runs once when page loads
  useEffect(() => {
    fetchTrips();
  }, []);

  // GET all trips from FastAPI sorted by date
  async function fetchTrips() {
    const res  = await fetch("http://localhost:8000/trips");
    const data = await res.json();

    // sort by date oldest first
    const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrips(sorted);
  }

  // DELETE a trip
  async function deleteTrip(id) {
    await fetch("http://localhost:8000/trips/" + id, { method: "DELETE" });
    fetchTrips();
  }

  // get the most recent trip name for stats card
  const latestTrip = trips.length > 0 ? trips[trips.length - 1] : null;

  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* ---- GREETING ---- */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Good morning, traveller</h1>
        <p className="text-gray-400 text-sm mt-1">Here is your travel story so far</p>
      </div>

      {/* ---- STATS ROW ---- */}
      {/* 3 cards showing quick numbers */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        {/* total trips */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total trips</p>
          <p className="text-3xl font-bold text-gray-800">{trips.length}</p>
          <p className="text-xs text-gray-400 mt-1">all time</p>
        </div>

        {/* latest trip */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Latest trip</p>
          <p className="text-sm font-bold text-gray-800 mt-2">
            {latestTrip ? latestTrip.location : "—"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {latestTrip ? latestTrip.date : "no trips yet"}
          </p>
        </div>

        {/* next trip placeholder */}
        <div className="bg-teal-50 rounded-xl p-4">
          <p className="text-xs text-teal-600 mb-1">Add a trip</p>
          <button
            onClick={() => navigate("/add")}
            className="text-sm font-bold text-teal-700 mt-2"
          >
            + New trip
          </button>
        </div>

      </div>

      {/* ---- TIMELINE LABEL ---- */}
      <p className="text-xs font-semibold text-gray-400 tracking-widest mb-4">
        TIMELINE
      </p>

      {/* ---- EMPTY STATE ---- */}
      {/* shows only when trips array is empty */}
      {trips.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="text-4xl mb-4">🗺</p>
          <p className="text-gray-700 font-semibold text-lg">No trips yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Your travel story starts with one trip.
          </p>
          <button
            onClick={() => navigate("/add")}
            className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-teal-600"
          >
            + Add your first trip
          </button>
        </div>
      )}

      {/* ---- TRIP LIST ---- */}
      {/* loops through trips and renders a TripCard for each */}
      {trips.map((trip) => (
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