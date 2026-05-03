// TripCard.js
// Displays one journal entry with all details

function TripCard({ trip, onDelete }) {

  // calculate total days if we have both dates
  const daysDiff = trip.num_days || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">

      {/* photos carousel */}
      {trip.photo_urls && trip.photo_urls.length > 0 && (
        <div className="w-full h-48 bg-gray-100 overflow-x-auto flex">
          {trip.photo_urls.slice(0, 3).map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`trip-${idx}`}
              className="w-1/3 h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* content */}
      <div className="p-5">

        {/* header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{trip.title}</h3>
            <p className="text-sm text-gray-500">{trip.location} • {daysDiff} days</p>
          </div>
          <button
            onClick={() => onDelete(trip.id)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Delete
          </button>
        </div>

        {/* dates */}
        <p className="text-xs text-gray-400 mb-3">
          {trip.date_start} → {trip.date_end}
        </p>

        {/* description */}
        {trip.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{trip.description}</p>
        )}

        {/* trip highlights */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-3">

          {trip.best_moments && (
            <div className="bg-teal-50 p-2 rounded">
              <p className="text-teal-700 font-semibold">✨ Best Moment</p>
              <p className="text-teal-600 text-xs">{trip.best_moments.substring(0, 50)}...</p>
            </div>
          )}

          {trip.total_expense > 0 && (
            <div className="bg-orange-50 p-2 rounded">
              <p className="text-orange-700 font-semibold">💰 Total Spent</p>
              <p className="text-orange-600">₹ {trip.total_expense.toFixed(0)}</p>
            </div>
          )}

          {trip.major_places && trip.major_places.length > 0 && (
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-blue-700 font-semibold">🗺 Places</p>
              <p className="text-blue-600 text-xs">{trip.major_places.slice(0, 2).join(", ")}</p>
            </div>
          )}

          {trip.transportation && (
            <div className="bg-purple-50 p-2 rounded">
              <p className="text-purple-700 font-semibold">🚗 Transport</p>
              <p className="text-purple-600 text-xs">{trip.transportation}</p>
            </div>
          )}
        </div>

        {/* travelers */}
        {trip.travelers && trip.travelers.length > 0 && (
          <div className="text-xs mb-3">
            <p className="text-gray-600 font-semibold mb-1">👥 With</p>
            <div className="flex gap-2 flex-wrap">
              {trip.travelers.map((t, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* challenges */}
        {trip.challenges && trip.challenges.length > 0 && (
          <div className="text-xs">
            <p className="text-gray-600 font-semibold mb-1">⚠️ Challenges</p>
            <p className="text-gray-500">{trip.challenges.join(", ")}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default TripCard;