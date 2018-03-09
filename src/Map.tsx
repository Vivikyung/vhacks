import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';
import { fetch } from 'isomorphic-fetch';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import * as React from 'react';
import AppState from './AppState';

const InnerComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 41.9028, lng: 12.4964 }}
      onClick={props.handleMapClick}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
        ))}
      </MarkerClusterer>
    
      <Marker
        position={{ lat : props.displayLat, lng : props.displayLng }}
      />
    </GoogleMap>
)

export default class Map extends React.Component<{ appState: AppState }, {}> {
  state = {
    markers : [],
    userlat : 0.00,
    userlng : 0.00,
    request : false,
  }

  sendMarker() {
    const socket = '192.168.200.68:4567/chat';
    const data = {username: 'vivian'};

    fetch(socket, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

  setMarkers () {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos });
      });
  }

  handleMapClick = ({latLng}) => {
    this.setState({ userlat : latLng.lat() })
    this.setState({ userlng: latLng.lng() })
  }

  render() {
    return (
      <div>
        <InnerComponent
          handleMapClick={this.handleMapClick}
          displayLat = {this.state.userlat}
          displayLng = {this.state.userlng}
          markers = {this.state.markers}
        />
        <button onClick={this.sendMarker}>
          Make Request
        </button> 
      </div>
    )
  }
}

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
