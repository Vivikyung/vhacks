import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import * as React from 'react';
import AppState from './AppState';

const InnerComponent = withScriptjs(withGoogleMap((props) => {
  return <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
  </GoogleMap>
}))

export default class Map extends React.Component<{ appState: AppState }, {}> {
  render() {
    return <InnerComponent googleMapURL={'https://maps.googleapis.com/maps/api/js'}
      loadingElement={<div>Loading</div>}
      containerElement={<div>Container</div>}
      mapElement={<div>Map</div>} />
  }
}