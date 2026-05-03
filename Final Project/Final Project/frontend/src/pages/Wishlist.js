// Wishlist.js
// Future destinations wishlist

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {

  const [items, setItems] = useState([]);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whenPlanned, setWhenPlanned] = useState("");
  const navigate = useNavigate();

  // fetch wishlist on load
  useEffect(() => {
    fetchWishlist();
  }, []);

  // GET wishlist from FastAPI
  async function fetchWishlist() {
    try {
      const res = await fetch("http://localhost:8000/wishlist");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  }

  // POST new wishlist item
  async function handleAdd() {
    if (!title || !location) {
      alert("Title and location required!");
      return;
    }

    const item = {
      title,
      location,
      description,
      when_planned: whenPlanned
    };

    try {
      const res = await fetch("http://localhost:8000/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });

      if (res.ok) {
        alert("Added to wishlist!");
        setTitle("");
        setLocation("");
        setDescription("");
        setWhenPlanned("");
        fetchWishlist();
      }
    } catch (err) {
      alert("Error adding to wishlist: " + err.message);
    }
  }

  // DELETE from wishlist
  async function handleDelete(id) {
    try {
      await fetch("http://localhost:8000/wishlist/" + id, {
        method: "DELETE"
      });
      fetchWishlist();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">✈ Wishlist</h1>
      <p className="text-gray-500 mb-6">Places you want to visit</p>

      {/* add to wishlist form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Add a destination</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Trip title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Location *"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <textarea
            placeholder="Why do you want to go?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="date"
            value={whenPlanned}
            onChange={(e) => setWhenPlanned(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <button
            onClick={handleAdd}
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 font-semibold"
          >
            + Add to Wishlist
          </button>
        </div>
      </div>

      {/* wishlist items */}
      <div>
        <p className="text-sm text-gray-500 mb-3">{items.length} item(s)</p>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No wishlist items yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.location}</p>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                    {item.when_planned && (
                      <p className="text-xs text-gray-400 mt-2">Planned: {item.when_planned}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Wishlist;