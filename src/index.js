import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';

// This function will be exposed on the global 'MapboxApp' object
// It allows CasualOS to tell your app where to render itself.
export function mount(containerNode, props) {
  if (containerNode) {
    ReactDOM.render(<MapComponent {...props} />, containerNode);
  } else {
    console.error('No container node provided.');
  }
}
