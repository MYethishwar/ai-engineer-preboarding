// AddTripPage.js
// page that contains the Add Trip form
// at URL /add

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTripPage() {

  // form input states
  const [location,    setLocation]    = useState("");
  const [date,        setDate]        = useState("");
  const [description, setDescription] = useState("");

  // photo file state — stores the actual file object
  const [photo, setPhoto] = useState(null);

  // useNavigate → lets us redirect to another page
  // after form submission we go back to /
  const navigate = useNavigate();

  async function handleSubmit() {

    // basic validation
    if (!location || !date) {
      alert("Location and date are required!");
      return;
    }

    // step 1 — upload photo first if user selected one
    let photo_url = null;

    if (photo) {
      // FormData is used to send files
      const formData = new FormData();
      formData.append("file", photo); // attach the file

      // POST to /upload route
      const uploadRes = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData  // no Content-Type header needed for files
      });

      const uploadData = await uploadRes.json();
      photo_url = uploadData.photo_url; // get back the URL
    }

    // step 2 — save the trip with photo URL
    await fetch("http://localhost:8000/trips", {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify({ location, date, description, photo_url })
    });

    // step 3 — go back to timeline after saving
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add a New Trip</h1>

      {/* form card */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">

        {/* location input */}
        <div>
          <label className="text-sm font-medium text-gray-600">Location</label>
          <input
            type="text"
            placeholder="e.g. Kyoto, Japan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* date input */}
        <div>
          <label className="text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* description input */}
        <div>
          <label className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            placeholder="What did you experience?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* photo upload input */}
        <div>
          <label className="text-sm font-medium text-gray-600">Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            // e.target.files[0] = the first file user selected
            className="w-full mt-1 text-sm text-gray-500"
          />
        </div>

        {/* submit button */}
        <button
          onClick={handleSubmit}
          className="bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 font-medium"
        >
          + Add Trip
        </button>

      </div>
    </div>
  );
}

export default AddTripPage;