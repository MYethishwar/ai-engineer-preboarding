import { useState, useEffect } from "react";

function TripStatistics() {

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    const res = await fetch("http://localhost:8000/journals");
    const data = await res.json();
    setTrips(data);
  }

  // calculate statistics
  const totalTrips = trips.length;
  
  const totalDays = trips.reduce((sum, trip) => sum + (trip.num_days || 0), 0);
  
  const totalSpent = trips.reduce((sum, trip) => sum + (trip.total_expense || 0), 0);
  
  const uniqueLocations = [...new Set(trips.map(t => t.location))].length;
  
  const mostExpensiveTrip = trips.length > 0 
    ? trips.reduce((max, trip) => (trip.total_expense > (max.total_expense || 0) ? trip : max))
    : null;

  const longestTrip = trips.length > 0
    ? trips.reduce((max, trip) => (trip.num_days > (max.num_days || 0) ? trip : max))
    : null;

  const averageSpent = totalTrips > 0 ? (totalSpent / totalTrips).toFixed(0) : 0;

  // find most visited transportation
  const transportationCount = {};
  trips.forEach(trip => {
    if (trip.transportation) {
      transportationCount[trip.transportation] = (transportationCount[trip.transportation] || 0) + 1;
    }
  });
  const mostUsedTransport = Object.keys(transportationCount).length > 0
    ? Object.entries(transportationCount).reduce((max, [key, val]) => val > max[1] ? [key, val] : max)[0]
    : "None";

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Trip Statistics</h1>
      <p className="text-gray-500 mb-8">Your travel analytics and insights</p>

      {/* MAIN STATS GRID */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        {/* Total Trips */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p className="text-blue-600 text-sm font-semibold">Total Trips</p>
          <p className="text-4xl font-bold text-blue-700 mt-2">{totalTrips}</p>
          <p className="text-xs text-blue-500 mt-2">adventures completed</p>
        </div>

        {/* Total Days */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <p className="text-green-600 text-sm font-semibold">Total Days Traveled</p>
          <p className="text-4xl font-bold text-green-700 mt-2">{totalDays}</p>
          <p className="text-xs text-green-500 mt-2">days on the road</p>
        </div>

        {/* Total Spent */}
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <p className="text-orange-600 text-sm font-semibold">Total Spent</p>
          <p className="text-4xl font-bold text-orange-700 mt-2">₹{totalSpent.toFixed(0)}</p>
          <p className="text-xs text-orange-500 mt-2">total travel budget</p>
        </div>

        {/* Unique Locations */}
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <p className="text-purple-600 text-sm font-semibold">Unique Locations</p>
          <p className="text-4xl font-bold text-purple-700 mt-2">{uniqueLocations}</p>
          <p className="text-xs text-purple-500 mt-2">different places visited</p>
        </div>

      </div>

      {/* SECONDARY STATS */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        {/* Average Spent */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 text-sm font-semibold">Average Per Trip</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">₹{averageSpent}</p>
        </div>

        {/* Most Used Transport */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 text-sm font-semibold">Most Used Transport</p>
          <p className="text-2xl font-bold text-gray-800 mt-2 capitalize">{mostUsedTransport}</p>
        </div>

      </div>

      {/* FEATURED TRIPS */}
      <div className="grid grid-cols-2 gap-6">

        {/* Most Expensive */}
        {mostExpensiveTrip && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-semibold mb-3">💰 Most Expensive Trip</p>
            <p className="text-xl font-bold text-gray-800">{mostExpensiveTrip.title}</p>
            <p className="text-sm text-gray-600 mt-1">{mostExpensiveTrip.location}</p>
            <p className="text-lg font-bold text-orange-600 mt-3">₹{mostExpensiveTrip.total_expense}</p>
          </div>
        )}

        {/* Longest Trip */}
        {longestTrip && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-semibold mb-3">📅 Longest Trip</p>
            <p className="text-xl font-bold text-gray-800">{longestTrip.title}</p>
            <p className="text-sm text-gray-600 mt-1">{longestTrip.location}</p>
            <p className="text-lg font-bold text-green-600 mt-3">{longestTrip.num_days} days</p>
          </div>
        )}

      </div>

      {/* INSIGHTS */}
      {trips.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200">
          <p className="text-teal-900 font-semibold mb-3">✨ Quick Insights</p>
          <ul className="space-y-2 text-sm text-teal-800">
            <li>• You've traveled an average of <strong>{(totalDays / totalTrips).toFixed(1)} days</strong> per trip</li>
            <li>• Your most popular destination: <strong>{uniqueLocations} different locations</strong></li>
            <li>• Average spending per trip: <strong>₹{averageSpent}</strong></li>
            <li>• You prefer traveling by <strong className="capitalize">{mostUsedTransport}</strong></li>
          </ul>
        </div>
      )}

      {trips.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No trips yet. Add your first trip to see statistics!</p>
        </div>
      )}

    </div>
  );
}

export default TripStatistics;
