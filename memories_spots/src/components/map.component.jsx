import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set default icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({
  center = [43.6047, 1.4442],
  zoom = 13,
  height = '400px',
  width = '100%',
  markers = [
    {
      position: [43.6047, 1.4442],
      content: {
        title: 'Rex at the park',
        date: '05/05/2021',
        link: '',
      },
    },
    {
      position: [43.5857545013228, 1.4173893435180118],
      content: {
        title: 'First TFC match',
        date: '05/05/2021',
        link: '',
      },
    },
    {
      position: [43.609209872679564, 1.4344314458022696],
      content: {
        title: 'Best ramen in town',
        date: '05/05/2021',
        link: '',
      },
    },
  ],
}) => (
    <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width }}
    >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
                <Popup offset={[12, 0]}>
                  <div className='marker'>
                    <strong>{marker.content.title}</strong>
                    <br/>
                    {marker.content.date}
                    <br/>
                    {marker.content.link ? (
                        <a href={marker.content.link} target="_blank" rel="noopener noreferrer">See more</a>
                    ) : (
                        <span>See more ...</span>
                    )}
                  </div>
                </Popup>
            </Marker>
        ))}
    </MapContainer>
);

MapComponent.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.arrayOf(PropTypes.number).isRequired,
      content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
};

export default MapComponent;
