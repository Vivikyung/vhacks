import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
//import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import * as React from 'react';
import AppState from './AppState';
import autobind from 'autobind-decorator';

type MyProps = {
  children?: React.ReactNode,
  outer: Map
}

const InnerComponent = withScriptjs(withGoogleMap((props: MyProps) => {
  return <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onClick={props.outer.create}
  >
    {props.outer.props.appState.markers.map((marker) => {
      return <Marker position={{ lat: marker.lat, lng: marker.lng }} />
    })}
  </GoogleMap>
}))

export default class Map extends React.Component<{ appState: AppState }, {}> {

  @autobind
  create(data) {
    const lat = data.latLng.lat();
    const lng = data.latLng.lng();
    console.log(lat);
    console.log(lng);
    this.props.appState.markers.push({
      lat: lat,
      lng: lng
    })
  }

  render() {
    return <div style={{ height: "1000px", width: "100%" }}>
      <InnerComponent
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        outer={this}
      />
    </div>
  }
}