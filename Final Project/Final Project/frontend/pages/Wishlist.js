// Wishlist.js
// page for future destinations
// at URL /wishlist

import { useState, useEffect } from "react";

function Wishlist() {

  // wishlist state
  const [items,    setItems]    = useState([]);

  // form states
  const [location,    setLocation]    = useState("");
  const [date,        setDate]        = useState("");
  const [description, setDescription] = useState("");

  // runs once when page loads
  useEffect(() => {
    fetchWishlist();
  }, []);

  // GET all wishlist items from FastAPI
  async function fetchWishlist() {
    const res  = await fetch("http://localhost:8000/wishlist");
    const data = await res.json();
    setItems(data);
  }

  // POST new wishlist item
  async function addToWishlist() {
    if (!location) {
      alert("Location is required!");
      return;
    }

    await fetch("http://localhost:8000/wishlist", {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify({ location, date, description })
    });

    // clear form
    setLocation("");
    setDate("");
    setDescription("");

    fetchWishlist(); // refresh list
  }

  // DELETE wishlist item
  async function removeFromWishlist(id) {
    await fetch("http://localhost:8000/wishlist/" + id, {
      method: "DELETE"
    });
    fetchWishlist();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Wishlist</h1>

      {/* add to wishlist form */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-8">

        <h2 className="text-lg font-semibold text-gray-700">Add a Dream Destination</h2>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
        />

        <textarea
          placeholder="Why do you want to go?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
        />

        <button
          onClick={addToWishlist}
          className="bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 font-medium"
        >
          + Add to Wishlist
        </button>

      </div>

      {/* wishlist items */}
      {items.length === 0 && (
        <p className="text-gray-400 text-center py-6">
          No wishlist items yet!
        </p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-start"
        >
          <div>
            <p className="font-bold text-gray-800">{item.location}</p>
            <p className="text-sm text-gray-400">{item.date}</p>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </div>

          <button
            onClick={() => removeFromWishlist(item.id)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

    </div>
  );
}

export default Wishlist;