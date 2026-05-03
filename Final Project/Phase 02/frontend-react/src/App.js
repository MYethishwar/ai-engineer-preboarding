// App.js is the ROOT component
// Every other component lives inside this one
// This is where we store trips state and fetch from FastAPI

import { useState, useEffect } from "react";
import AddTrip from "./components/AddTrip";
import TripList from "./components/TripList";

function App() {
  // useState — trips is our list, setTrips updates it
  // When setTrips is called → React re-renders automatically
  // This replaces: const trips = [] from Phase 1
  const [trips, setTrips] = useState([]);

  // useEffect — runs once when page loads
  // The [] at the end means "only run on first load"
  // This replaces: manually calling fetchTrips() on page load
  useEffect(() => {
    fetchTrips();
  }, []);
  // fetchTrips — calls GET /trips on our FastAPI backend
  // then stores the result in trips state
  async function fetchTrips() {
    const res  = await fetch("http://localhost:8000/trips");
    const data = await res.json();
    setTrips(data);
  }

  // addTrip — sends new trip to FastAPI via POST
  // then re-fetches the list so UI updates
  async function addTrip(newTrip) {
    await fetch("http://localhost:8000/trips", {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify(newTrip)
    });
    fetchTrips();
  }

  // deleteTrip — sends DELETE request to FastAPI
  // then re-fetches so deleted card disappears
  async function deleteTrip(id) {
    await fetch("http://localhost:8000/trips/" + id, {
      method: "DELETE"
    });
    fetchTrips();
  }
  // JSX — looks like HTML but it's JavaScript
  // We pass data DOWN to child components via props
  // onAdd and onDelete are functions passed as props
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem" }}>
      <h1>✈ Travel Journal</h1>
      <AddTrip  onAdd={addTrip} />
      <TripList trips={trips} onDelete={deleteTrip} />
    </div>
  );
}

export default App;