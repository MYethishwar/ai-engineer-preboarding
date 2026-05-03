import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);
  const [users, setUsers] = useState([]);
  const [tripId, setTripId] = useState("");
  const [singleTrip, setSingleTrip] = useState(null);

  useEffect(() => {
  getTrips();
  }, []);

  // GET all trips
  const getTrips = async () => {
    const res = await fetch("http://127.0.0.1:8000/trips");
    const data = await res.json();
    setTrips(data);
    setSingleTrip(null);
  };

  // GET all users
  const getUsers = async () => {
    const res = await fetch("http://127.0.0.1:8000/users");
    const data = await res.json();
    setUsers(data);
  };

  // GET trip by ID
  const getTripById = async () => {
    if (!tripId) return;

    const res = await fetch(`http://127.0.0.1:8000/trips/${tripId}`);
    const data = await res.json();
    setSingleTrip(data);
  };

  // DELETE trip
  const deleteTrip = async () => {
  if (!tripId) {
    alert("Please enter a Trip ID");
    return;
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000/trips/${tripId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    // Show result
    alert(data.message || data.error);

    // Remove deleted trip from UI instantly (without reload)
    setTrips((prevTrips) =>
      prevTrips.filter((trip) => trip.id !== Number(tripId))
    );

    // Clear selected trip view
    setSingleTrip(null);

    // Clear input field
    setTripId("");
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
};

  return (
    <div className="container">
      <h1>Travel Journal</h1>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={getTrips}>Get All Trips</button>
        <button onClick={getUsers}>Get All Users</button>
      </div>

      {/* Input section */}
      <div className="search-box">
        <input
          type="number"
          placeholder="Enter Trip ID"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
        <button onClick={getTripById}>Get Trip</button>
        <button className="delete-btn" onClick={deleteTrip}>
          Delete Trip
        </button>
      </div>

      {/* Single Trip */}
      {singleTrip && (
        <div className="card">
          <h3>Trip Details</h3>
          <p><strong>{singleTrip.place}</strong></p>
          <p>{singleTrip.description}</p>
        </div>
      )}

      {/* Trips */}
      <div className="list">
        <h2>Trips</h2>
        {trips.map((trip) => (
          <div key={trip.id} className="card">
            <p><strong>{trip.place}</strong></p>
            <p>{trip.description}</p>
          </div>
        ))}
      </div>

      {/* Users */}
      <div className="list">
        <h2>Users</h2>
        {users.map((user, index) => (
          <div key={index} className="card">
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;