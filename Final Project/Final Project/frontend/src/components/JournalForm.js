// JournalForm.js
// Complete form for creating/editing a journal entry
// Divided into sections for clarity

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseList from "./ExpenseList";
import TravelersInput from "./TravelersInput";

function JournalForm() {

  // basic info
  const [title, setTitle]           = useState("");
  const [dateStart, setDateStart]   = useState("");
  const [dateEnd, setDateEnd]       = useState("");
  const [location, setLocation]     = useState("");
  const [description, setDescription] = useState("");
  const [numDays, setNumDays]       = useState("");

  // expenses and money
  const [expenses, setExpenses]     = useState([]);

  // experiences
  const [bestMoments, setBestMoments] = useState("");
  const [majorPlaces, setMajorPlaces] = useState("");
  const [challenges, setChallenges]   = useState("");

  // travel details
  const [transportation, setTransportation] = useState("flight");
  const [tripType, setTripType]     = useState("friends");

  // people
  const [travelers, setTravelers]   = useState([]);

  // photos
  const [photoUrls, setPhotoUrls]   = useState([]);
  const [uploading, setUploading]   = useState(false);

  // location coords for map
  const [latitude, setLatitude]     = useState("0");
  const [longitude, setLongitude]   = useState("0");

  const navigate = useNavigate();

  // transportation options user can choose from
  const transportationOptions = [
    "flight",
    "train",
    "car",
    "bus",
    "bike",
    "walking",
    "ship/ferry",
    "mixed"
  ];

  // trip type options
  const tripTypeOptions = [
    "solo",
    "friends",
    "family",
    "couple",
    "work",
    "adventure"
  ];

  // handle photo upload
  async function handlePhotoUpload(e) {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData
        });

        const data = await res.json();
        setPhotoUrls([...photoUrls, data.photo_url]);
      } catch (err) {
        alert("Photo upload failed");
      }
    }

    setUploading(false);
  }

  // remove photo from list
  function removePhoto(index) {
    const updated = photoUrls.filter((_, i) => i !== index);
    setPhotoUrls(updated);
  }

  // handle form submit
  async function handleSubmit() {

    // validation
    if (!title || !dateStart || !location) {
      alert("Title, date, and location are required!");
      return;
    }

    if (photoUrls.length === 0) {
      alert("At least one photo is required!");
      return;
    }

    // parse major places from string (comma separated)
    const placesArray = majorPlaces
      .split(",")
      .map(p => p.trim())
      .filter(p => p);

    // parse challenges from string (comma separated)
    const challengesArray = challenges
      .split(",")
      .map(c => c.trim())
      .filter(c => c);

    // build the journal entry object
    const entry = {
      title,
      date_start: dateStart,
      date_end: dateEnd || dateStart,
      location,
      description,
      expenses,
      best_moments: bestMoments,
      major_places: placesArray,
      transportation,
      num_days: parseInt(numDays) || 0,
      trip_type: tripType,
      travelers,
      challenges: challengesArray,
      photo_urls: photoUrls,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0
    };

    // POST to FastAPI
    try {
      const res = await fetch("http://localhost:8000/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
      });

      if (res.ok) {
        alert("Journal entry saved!");
        navigate("/");
      } else {
        alert("Failed to save entry");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold text-gray-800">📔 Create Journal Entry</h1>

      {/* ---- SECTION 1: BASIC INFO ---- */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">Basic Information</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            placeholder="e.g., Cherry Blossom Adventure in Kyoto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Start Date *</label>
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location *</label>
          <input
            type="text"
            placeholder="e.g., Kyoto, Japan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Number of Days</label>
            <input
              type="number"
              placeholder="5"
              value={numDays}
              onChange={(e) => setNumDays(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Map Longitude (optional)</label>
            <input
              type="number"
              step="0.0001"
              placeholder="77.0369"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Map Latitude (optional)</label>
          <input
            type="number"
            step="0.0001"
            placeholder="35.0116"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Tell your story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
          />
        </div>
      </div>

      {/* ---- SECTION 2: EXPENSES ---- */}
      <ExpenseList expenses={expenses} onExpensesChange={setExpenses} />

      {/* ---- SECTION 3: EXPERIENCES ---- */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">✨ Experiences</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Best Moments</label>
          <textarea
            placeholder="What was the most memorable moment?"
            value={bestMoments}
            onChange={(e) => setBestMoments(e.target.value)}
            rows="3"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Major Places Covered</label>
          <textarea
            placeholder="Temple A, Temple B, Market (separate with commas)"
            value={majorPlaces}
            onChange={(e) => setMajorPlaces(e.target.value)}
            rows="2"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Challenges Faced</label>
          <textarea
            placeholder="Bad weather, flight delay (separate with commas)"
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            rows="2"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* ---- SECTION 4: TRAVEL DETAILS ---- */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">🚗 Travel Details</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Primary Transportation</label>
          <select
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            {transportationOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Trip Type</label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            {tripTypeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ---- SECTION 5: PEOPLE ---- */}
      <TravelersInput travelers={travelers} onTravelersChange={setTravelers} />

      {/* ---- SECTION 6: PHOTOS (MANDATORY) ---- */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">📸 Photos *</h2>
        <p className="text-sm text-gray-500">Upload at least one photo (required)</p>

        {/* file input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          disabled={uploading}
          className="w-full text-sm text-gray-600"
        />

        {uploading && <p className="text-teal-500 text-sm">Uploading...</p>}

        {/* photos list */}
        {photoUrls.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              {photoUrls.length} photo(s) uploaded
            </p>
            <div className="grid grid-cols-3 gap-3">
              {photoUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`photo-${idx}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---- SUBMIT BUTTON ---- */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600"
        >
          💾 Save Journal Entry
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}

export default JournalForm;