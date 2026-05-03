// TripCard.js
// displays one trip card
// shows photo if it exists

function TripCard({ trip, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">

      {/* show photo if trip has one */}
      {trip.photo_url && (
        <img
          src={trip.photo_url}
          alt={trip.location}
          className="w-full h-48 object-cover rounded-lg mb-4"
          // object-cover = fills the box without stretching
        />
      )}

      {/* trip details */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-800 text-lg">{trip.location}</p>
          <p className="text-sm text-gray-400">{trip.date}</p>
          <p className="text-sm text-gray-500 mt-2">{trip.description}</p>
        </div>

        {/* delete button */}
        <button
          onClick={() => onDelete(trip.id)}
          className="text-red-400 hover:text-red-600 text-sm ml-4"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default TripCard;