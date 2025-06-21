import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';

class MapWebComponent extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<MapComponent />, this.attachShadow({ mode: 'open' }));
  }
}
customElements.define('map-component', MapWebComponent);
