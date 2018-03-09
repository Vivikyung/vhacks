import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
//import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { compose, withProps, withHandlers } from "recompose"
import * as React from 'react';
import AppState from './AppState';
/*
const InnerComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    //onClick={function(create){const lat=create.latLng.lat(); const lng=create.latLng.lng()}}
  >
  {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)


class InnerComponent extends React.Component <{ appState: AppState }, {}> {
  constructor(props){
    super(props);
    this.state = {marker : []};
    this.handleClick = this.handleClick.bind(this);
    
  };

  handleClick() {
    onClick{}
    this.setStat( marker.push({
      lat : latLng.lat(),
      lng : latLng.lng()
    }))};
  }

  render() {
  return <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    
  >
  <Marker
    position={{this.lat, this.lng}}
  />
  </GoogleMap>
}}

export default class Map extends React.Component<{ appState: AppState }, {}> {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }
  
  render() {
    console.log("state ", this.state.isMarkerShown)
    return <div style={{ height: "1000px", width: "100%" }}>
      <InnerComponent
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
    </div>
  }
}*/

const InnerComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      onClick={props.handleMapClick}
    >
      <Marker position={{ lat : props.displayLat, lng : props.displayLng }}/>
    </GoogleMap>
)

export default class Map extends React.Component<{ appState: AppState }, {}> {
  state = {
    isMarkerShown: true,
    lat : 0.00,
    lng : 0.00,
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: false })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  handleMapClick = ({latLng}) => {
    this.setState({ lat : latLng.lat() })
    this.setState({ lng: latLng.lng() })
  }

  render() {
    return (
      <InnerComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        handleMapClick={this.handleMapClick}
        displayLat = {this.state.lat}
        displayLng = {this.state.lng}
      />
    )
  }
}