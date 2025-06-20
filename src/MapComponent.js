import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicGVhc2hvb3RlciIsImEiOiJjbWFzdzk1b2kwcGd0MmtwcXd4cmVmcTk4In0.ULAjkgtUlUV18OirDsnSgQ';

// The ID of the container created by your mount() function
const MAP_CONTAINER_ID = 'mapbox-app-container';

const MapComponent = () => {
  // We no longer need a ref for the map container itself.
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) return; // Initialize map only once

    // Ensure the container element exists before initializing the map.
    if (!document.getElementById(MAP_CONTAINER_ID)) {
      console.error(`Map container with ID #${MAP_CONTAINER_ID} not found in the DOM.`);
      return;
    }

    mapRef.current = new mapboxgl.Map({
      // Use the ID of the container that was already created.
      container: MAP_CONTAINER_ID, 
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0059, 40.7128],
      zoom: 9,
    });

    mapRef.current.on('load', () => setIsMapLoaded(true));

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const sendZoomMessage = (coordinates) => {
    if (isMapLoaded && mapRef.current) {
      mapRef.current.flyTo({
        center: coordinates,
        zoom: 12,
        essential: true
      });
    }
  };
  
  // The component now only needs to render the overlay UI, not the map container itself.
  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: 'white', padding: '10px' }}>
      <button onClick={() => sendZoomMessage([-74.0059, 40.7128])}>
        Zoom to New York
      </button>
      <button onClick={() => sendZoomMessage([-118.2437, 34.0522])}>
        Zoom to Los Angeles
      </button>
    </div>
  );
};

export default MapComponent;
