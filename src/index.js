import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';

// Define the custom element only once
class MapWebComponent extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root once in the constructor
    this._root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Render React component into the shadow root
    ReactDOM.render(<MapComponent />, this._root);
  }

  disconnectedCallback() {
    // Clean up when the element is removed
    ReactDOM.unmountComponentAtNode(this._root);
  }
}

// Register the custom element if not already defined
if (!customElements.get('map-component')) {
  customElements.define('map-component', MapWebComponent);
}
