import TripCard from "./TripCard";

function TripList({ trips, onDelete }) {

  if (trips.length === 0) {
    return <p>No trips yet. Add one above!</p>;
  }

  return (
    <div>
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TripList;