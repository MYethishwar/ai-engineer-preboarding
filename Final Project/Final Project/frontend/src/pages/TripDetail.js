
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TripDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
<button
  onClick={() => navigate("/")}
  className="text-teal-600 hover:text-teal-1000 mb-6 font-semibold"
>
  ← Back to Timeline
</button>

  // fetch single trip on load
  useEffect(() => {
    fetchTrip(); //Fetch trip based on the give ID
  }, [id]);

  async function fetchTrip() {
    try {
      const res = await fetch(`http://localhost:8000/journals/${id}`);
      const data = await res.json();
      setTrip(data);
    } catch (err) {
      console.error("Error fetching trip:", err);
    }
    setLoading(false);
  }

  // delete trip
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    
    await fetch(`http://localhost:8000/journals/${id}`, { method: "DELETE" });
    navigate("/");
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  
  if (!trip) return <div className="p-6 text-center text-gray-400">Trip not found</div>;

  return (
    <div className="max-w-4xl bg-teal-50 mx-auto p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="text-teal-600 hover:text-teal-700 mb-6 font-semibold"
      >
        ← Back to Timeline
      </button>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{trip.title}</h1>
      <p className="text-gray-600 mb-6">{trip.location} • {trip.num_days} days</p>

      {/* PHOTOS GALLERY */}
      {trip.photo_urls && trip.photo_urls.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"></h2>
          <div className="grid grid-cols-3 gap-4">
            {trip.photo_urls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`trip-${idx}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* DATES */}
      <div className="bg-red-50 rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Dates</h3>
        <p className="text-gray-700">
          {trip.date_start} to {trip.date_end}
        </p>
        <p className="text-sm text-gray-500 mt-1">{trip.num_days} days</p>
      </div>

      {/* DESCRIPTION */}
      {trip.description && (
        <div className="bg-yellow-50 rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{trip.description}</p>
        </div>
      )}

      {/* BEST MOMENT */}
      {trip.best_moments && (
        <div className="bg-teal-50 rounded-lg border border-teal-200 p-6 mb-6">
          <h3 className="font-semibold text-teal-900 mb-3">Best Moment</h3>
          <p className="text-teal-800">{trip.best_moments}</p>
        </div>
      )}

      {/* EXPENSES */}
      {trip.expenses && trip.expenses.length > 0 && (
        <div className="bg-green-50 rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Expenses</h3>
          <div className="space-y-2">
            {trip.expenses.map((exp, idx) => (
              <div key={idx} className="flex justify-between text-gray-700 pb-2 border-b border-gray-100">
                <span className="capitalize">{exp.item}</span>
                <span className="font-semibold">₹{exp.amount}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-gray-800 font-bold mt-4 pt-4 border-t border-gray-300">
            <span>Total</span>
            <span className="text-orange-600">₹{trip.total_expense}</span>
          </div>
        </div>
      )}

      {/* PLACES COVERED */}
      {trip.major_places && trip.major_places.length > 0 && (
        <div className="bg-lime-50 rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Major Places</h3>
          <div className="space-y-2">
            {trip.major_places.map((place, idx) => (
              <p key={idx} className="text-gray-700">• {place}</p>
            ))}
          </div>
        </div>
      )}

      {/* TRANSPORTATION */}
      {trip.transportation && (
        <div className="bg-sky-50 rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Transportation</h3>
          <p className="text-gray-700 capitalize">{trip.transportation}</p>
        </div>
      )}

      {/* TRAVELERS */}
      {trip.travelers && trip.travelers.length > 0 && (
        <div className="bg-indigo-100 rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Traveled With</h3>
          <div className="space-y-2">
            {trip.travelers.map((person, idx) => (
              <p key={idx} className="text-gray-700">
                <strong>{person.name}</strong> ({person.relation})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* CHALLENGES */}
      {trip.challenges && trip.challenges.length > 0 && (
        <div className="bg-red-50 rounded-lg border border-red-200 p-6 mb-6">
          <h3 className="font-semibold text-red-900 mb-3">Challenges Faced</h3>
          <div className="space-y-2">
            {trip.challenges.map((challenge, idx) => (
              <p key={idx} className="text-red-800">• {challenge}</p>
            ))}
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-8">
        
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-800 font-semibold"
        >
          Delete Trip
        </button>
      </div>

    </div>
  );
}

export default TripDetail;
