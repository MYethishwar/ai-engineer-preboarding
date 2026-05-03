// TripCard.js — displays ONE trip
// receives trip object and onDelete function as props
// when Delete clicked → calls onDelete with this trip's id

function TripCard({ trip, onDelete }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", marginBottom: "10px" }}>

      {/* trip data comes from props */}
      <strong>{trip.location}</strong>
      <span style={{ float: "right", color: "#888", fontSize: "13px" }}>{trip.date}</span>
      <p style={{ marginTop: "6px", color: "#555" }}>{trip.description}</p>

      {/* onDelete is passed from App.js via TripList */}
      <button onClick={() => onDelete(trip.id)} style={{ color: "red" }}>
        Delete
      </button>
    </div>
  );
}

export default TripCard;