import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
//import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import * as React from 'react';
import AppState from './AppState';

const InnerComponent = withScriptjs(withGoogleMap((props) => {
  return <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onClick={function(create){const lat=create.latLng.lat(); const lng=create.latLng.lng(); console.log(lat); console.log(lng)}}
  >

  </GoogleMap>
}))

export default class Map extends React.Component<{ appState: AppState }, {}> {
  render() {
    return <div style={{ height: "1000px", width: "100%" }}>
      <InnerComponent
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />
    </div>
  }
}