import { useState, useEffect } from "react";

function Gallery() {

  const [trips, setTrips] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    const res = await fetch("http://localhost:8000/journals");
    const data = await res.json();
    setTrips(data);
  }

  // collect all photos with trip info
  const allPhotos = [];
  trips.forEach(trip => {
    if (trip.photo_urls && trip.photo_urls.length > 0) {
      trip.photo_urls.forEach(url => {
        allPhotos.push({
          url,
          tripTitle: trip.title || "Untitled Trip",
          tripLocation: trip.location || "Unknown Location",
          tripDate: trip.date_start || "No date"  // Make sure this exists
        });
      });
    }
  });

  return (
    <div className="w-full min-h-screen p-6 bg-teal-50">
      <h1 className="text-3xl font-bold text-teal-900 mb-2">📸 Photo Gallery</h1>
      <p className="text-teal-600 mb-8">
        {allPhotos.length} photos from your trips
      </p>

      {/* PHOTO GRID */}
      {allPhotos.length > 0 ? (
        <div className="grid grid-cols-5 gap-5 mb-8">
          {allPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo)}
              className="relative cursor-pointer group"
            >
              <img
                src={photo.url}
                alt={`photo-${idx}`}
                className="w-full h-48 object-cover rounded-lg group-hover:opacity-100 transition border border-teal-200"
              />
              <div className="absolute inset-0 bg-teal-900 bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition flex items-end">
                <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm font-semibold">{photo.tripTitle}</p>
                  <p className="text-xs">{photo.tripLocation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-teal-400">
          <p>No photos yet. Add trips with photos to see them here!</p>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-teal-900 bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-full relative">
            <img
              src={selectedPhoto.url}
              alt="full"
              className="max-w-full max-h-96 object-contain rounded-lg border border-teal-300"
            />
            <div className="mt-4 text-white text-center">
              <p className="text-xl font-bold text-teal-100">
                {selectedPhoto.tripTitle}
              </p>
              <p className="text-sm text-teal-300">
                {selectedPhoto.tripLocation} • {selectedPhoto.tripDate}
              </p>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 text-teal-100 text-2xl hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Gallery;