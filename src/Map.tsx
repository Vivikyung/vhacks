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
    return <div style={{ height: "300px", width: "300px" }}>
      <InnerComponent
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={< div > Loading</div>}
        containerElement={< div > Container</div >}
        mapElement={< div > Map</div >} />
    </div>
  }
}