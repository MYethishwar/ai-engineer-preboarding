import { useState, useEffect } from "react";
import AddTrip from "./components/AddTrip";
import TripList from "./components/TripList";

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);
  async function fetchTrips() {
    const res  = await fetch("http://localhost:8000/trips");
    const data = await res.json();
    setTrips(data);
  }
  async function addTrip(newTrip) {
    await fetch("http://localhost:8000/trips", {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify(newTrip)
    });
    fetchTrips();
  }
  async function deleteTrip(id) {
    await fetch("http://localhost:8000/trips/" + id, {
      method: "DELETE"
    });
    fetchTrips();
  }
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem" }}>
      <h1>✈ Travel Journal</h1>
      <AddTrip  onAdd={addTrip} />
      <TripList trips={trips} onDelete={deleteTrip} />
    </div>
  );
}

export default App;