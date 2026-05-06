
import React, { useState } from "react";

function TravelersInput({ travelers = [], onTravelersChange }) {
  const [newName, setNewName]       = useState("");
  const [newRelation, setNewRelation] = useState("friend");

  const relationOptions = [
    "friend",
    "family",
    "colleague",
    "partner",
    "sibling",
    "parent",
    "child",
    "other"
  ];

  function handleAdd() {
    if (!newName) {
      alert("Name required!");
      return;
    }

    const newTraveler = {
      name: newName,
      relation: newRelation
    };

    const currentTravelers = Array.isArray(travelers) ? travelers : [];
    const updated = [...currentTravelers, newTraveler];
    onTravelersChange(updated);

    setNewName("");
    setNewRelation("friend");
  }
  function handleRemove(index) {
    const currentTravelers = Array.isArray(travelers) ? travelers : [];
    const updated = currentTravelers.filter((_, i) => i !== index);
    onTravelersChange(updated);
  }

  const travelersArray = Array.isArray(travelers) ? travelers : [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">

      <h3 className="font-semibold text-gray-800 mb-4">👥 People Involved (Optional)</h3>

      {/* add traveler form */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />

        <select
          value={newRelation}
          onChange={(e) => setNewRelation(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          {relationOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600"
        >
          Add
        </button>
      </div>

      {/* travelers list */}
      {travelersArray.length === 0 ? (
        <p className="text-gray-400 text-sm">No travelers added</p>
      ) : (
        <div className="space-y-2">
          {travelersArray.map((traveler, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">{traveler.name}</p>
                <p className="text-xs text-gray-400">{traveler.relation}</p>
              </div>
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default TravelersInput;