import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the CSS here

mapboxgl.accessToken = 'pk.eyJ1IjoicGVhc2hvb3RlciIsImEiOiJjbWFzdzk1b2kwcGd0MmtwcXd4cmVmcTk4In0.ULAjkgtUlUV18OirDsnSgQ';

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) return; // Initialize map only once

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
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
  
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: 'white', padding: '10px' }}>
        <button onClick={() => sendZoomMessage([-74.0059, 40.7128])}>
          Zoom to New York
        </button>
        <button onClick={() => sendZoomMessage([-118.2437, 34.0522])}>
          Zoom to Los Angeles
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
