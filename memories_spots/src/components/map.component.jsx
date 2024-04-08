const {
  MapContainer, TileLayer, Marker, Popup,
} = require('react-leaflet');
require('leaflet/dist/leaflet.css');
const React = require('react');

const MapComponent = () => (
        <MapContainer center={[43.6047, 1.4442]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[43.6047, 1.4442]}>
                <Popup>
                    Toulouse, France
                </Popup>
            </Marker>
        </MapContainer>
);

export default MapComponent;
