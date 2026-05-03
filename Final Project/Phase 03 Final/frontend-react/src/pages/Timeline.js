// Timeline.js
// shows all trips sorted by date
// this is the HOME page at /

import { useState, useEffect } from "react";
import TripCard from "../components/TripCard";

function Timeline() {

  // trips state — stores all trips from MongoDB
  const [trips, setTrips] = useState([]);

  // runs once when page loads
  useEffect(() => {
    fetchTrips();
  }, []);

  // GET all trips from FastAPI
  async function fetchTrips() {
    const res  = await fetch("http://localhost:8000/trips");
    const data = await res.json();

    // sort trips by date — oldest first
    const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrips(sorted);
  }

  // DELETE a trip by id
  async function deleteTrip(id) {
    await fetch("http://localhost:8000/trips/" + id, {
      method: "DELETE"
    });
    fetchTrips(); // refresh list after delete
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Travel Timeline
      </h1>

      {/* show message if no trips */}
      {trips.length === 0 && (
        <p className="text-gray-400 text-center py-10">
          No trips yet. Add your first trip!
        </p>
      )}

      {/* loop through trips and show a TripCard for each */}
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