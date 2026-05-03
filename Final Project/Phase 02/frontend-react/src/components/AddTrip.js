// AddTrip.js — the form component
// It does NOT store trips — it just collects input
// and sends the data UP to App.js via the onAdd prop

import { useState } from "react";

function AddTrip({ onAdd }) {

  // each input field has its own state
  const [location,    setLocation]    = useState("");
  const [date,        setDate]        = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {

    // basic validation
    if (!location || !date) {
      alert("Location and date are required!");
      return;
    }

    // call onAdd (which is addTrip in App.js)
    // passing the new trip object up to parent
    onAdd({ location, date, description });

    // clear the form after submitting
    setLocation("");
    setDate("");
    setDescription("");
  }

  return (
    <div style={{ background: "#e0f7fa", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
      <h2>Add a Trip</h2>

      {/* onChange updates state every time user types */}
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "8px", padding: "8px" }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "8px", padding: "8px" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "8px", padding: "8px" }}
      />

      <button onClick={handleSubmit}>+ Add Trip</button>
    </div>
  );
}

export default AddTrip;