import React from 'react';
// Correct import for React 18+ createRoot API
import ReactDOM from 'react-dom'; 
import MapComponent from './MapComponent';

const CONTAINER_ID = 'mapbox-app-container';
let root = null; // Keep a reference to the root outside the functions

// This function creates its own container and renders the app into it
export function mount(props) {
  // Prevent re-mounting if the root is already active
  if (root) {
    return;
  }

  // 1. Create the container div programmatically
  const containerNode = document.createElement('div');
  containerNode.id = CONTAINER_ID;
  containerNode.style.width = '100%';
  containerNode.style.height = '100vh';
  
  // 2. Append the container to the document's body
  document.body.appendChild(containerNode);

  // 3. Create a root and render the React component
  root = ReactDOM.createRoot(containerNode);
  root.render(
    <React.StrictMode>
      <MapComponent {...props} />
    </React.StrictMode>
  );
}

// This function cleans up the component and its container
export function unmount() {
  if (root) {
    // Unmount the component using the root's unmount method
    root.unmount();
    root = null; // Clear the reference
    
    // Also remove the container div from the DOM
    const containerNode = document.getElementById(CONTAINER_ID);
    if (containerNode) {
      containerNode.remove();
    }
  }
}

// Expose these functions on the global window object
window.MapboxApp = { mount, unmount };
