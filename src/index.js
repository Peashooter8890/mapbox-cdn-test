import React from 'react';
import MapComponent from './MapComponent';

// This is the crucial part. We are not mounting anything here.
// We are simply making the component available on a global object.
window.MapboxApp = {
  Component: MapComponent,
};