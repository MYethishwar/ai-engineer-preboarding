import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon (leaflet issue) 
// Manually telling Leaflet to manually detect locations based on the below images
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function IndiaMap({ trips }) {

  const indiaCenter = [20.7196, 80.8577];

  const zoomLevel = 5;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-10">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Your Travel Map</h2>
        <p className="text-sm text-gray-500 mt-1">Locations of your trips across India...</p>
      </div>

      {/* Map container */}
      <MapContainer
        center={indiaCenter}
        zoom={zoomLevel}
        style={{ height: '600px', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Map tiles (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Pins for each trip */}
        {trips.map((trip) => {

          // Only show pin if trip has coordinates
          if (!trip.latitude || !trip.longitude) {
            return null;
          }

          return (
            <Marker
              key={trip.id}
              position={[trip.latitude, trip.longitude]}
            >
              {/* Pop-up when you click the pin */}
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{trip.title}</p>
                  <p className="text-gray-600">{trip.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{trip.date_start}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}

export default IndiaMap;