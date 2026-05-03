// TripList.js — receives the trips array from App.js
// loops through it and renders one TripCard per trip
// It does NOT fetch data — App.js does that

import TripCard from "./TripCard";

function TripList({ trips, onDelete }) {

  // if array is empty show a message
  if (trips.length === 0) {
    return <p>No trips yet. Add one above!</p>;
  }

  // .map() loops through trips array
  // returns one TripCard component for each trip
  // key={trip.id} is required by React to track each card
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