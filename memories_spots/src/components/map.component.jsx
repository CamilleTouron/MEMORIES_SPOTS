import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup, useMap, ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultMarkers = [
  {
    position: [43.6047, 1.4442], // Coordinates for Basilique Saint-Sernin
    content: {
      title: 'Basilique Saint-Sernin',
      date: '2022-01-01',
      link: '',
    },
  },
  {
    position: [43.6034, 1.4335], // Coordinates for Musée des Augustins
    content: {
      title: 'Musée des Augustins',
      date: '2022-01-02',
      link: '',
    },
  },
  {
    position: [43.6108, 1.4543], // Coordinates for Cité de l'espace
    content: {
      title: 'Cité de l\'espace',
      date: '2022-01-03',
      link: '',
    },
  },
];

const MapComponent = ({
  center = [43.6047, 1.4442],
  zoom = 13,
  height = '400px',
  width = '100%',
  memories,
  selectedMemories,
}) => {
  const [markers, setMarkers] = useState(defaultMarkers);
  const [newCenter, setNewCenter] = useState(center);

  useEffect(() => {
    if (selectedMemories) {
      setMarkers(selectedMemories.map((memory) => ({
        position: [memory.latitude, memory.longitude],
        content: {
          title: memory.title,
          date: memory.date,
          link: '',
        },
      })));
      if (selectedMemories.length > 0) {
        setNewCenter([selectedMemories[0].latitude, selectedMemories[0].longitude]);
      }
    }
  }, [memories, selectedMemories]);
  return (
    <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width }}
        zoomControl={false}
    >
      <ChangeView center={newCenter} zoom={zoom} />
      <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <ZoomControl position="bottomleft" />
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
                        <span>See more</span>
                    )}
                  </div>
                </Popup>
            </Marker>
        ))}
    </MapContainer>
  );
};

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
  memories: PropTypes.array,
  selectedMemories: PropTypes.array,
};

export default MapComponent;
