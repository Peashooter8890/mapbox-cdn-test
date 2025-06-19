import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';

const CONTAINER_ID = 'mapbox-app-container';

// This function creates its own container and renders the app into it
export function mount(props) {
  // Prevent re-mounting if the container already exists
  if (document.getElementById(CONTAINER_ID)) {
    return;
  }

  // 1. Create the container div programmatically
  const containerNode = document.createElement('div');
  containerNode.id = CONTAINER_ID;
  containerNode.style.width = '100%';
  containerNode.style.height = '100vh';
  
  // 2. Append the container to the document's body
  document.body.appendChild(containerNode);

  // 3. Render the React component into the newly created container
  ReactDOM.render(<MapComponent {...props} />, containerNode);
}

// This function cleans up the component and its container
export function unmount() {
  const containerNode = document.getElementById(CONTAINER_ID);
  if (containerNode) {
    // Properly unmount the React component to clean up event listeners
    ReactDOM.unmountComponentAtNode(containerNode);
    // Remove the container div from the DOM
    containerNode.remove();
  }
}

// Expose these functions on the global window object
window.MapboxApp = { mount, unmount };
