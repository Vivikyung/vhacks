import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';
import { fetch } from 'isomorphic-fetch';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import * as React from 'react';
import autobind from 'autobind-decorator'
import AppState from './AppState';

const InnerComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9J_Gmk6p51rs4y6fB6MlUkA07QpkOuEU&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="mapContainer" style={{ height: `100vh` }} />,
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
          key={marker.ID}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={props.onDispMarkerClick}
        />
        ))}
      </MarkerClusterer>

      <Marker
        position={{ lat : props.displayLat, lng : props.displayLng }}
      />
    </GoogleMap>
)

export default class Map extends React.Component<{ appState: AppState }, {}> {
  constructor(props) {
    super(props)
    this.state = {};

  }


  @autobind
  sendMarker() {
    console.log(this.props.appState.userlat);
    const data = {userIdx: this.props.appState.username, command: "RequestPoint", latitude: this.props.appState.userlat, longitude: this.props.appState.userlng};
    this.props.appState.ws.send(JSON.stringify(data));
  }

  @autobind
  setMarkers(this) {
    let mark = {latitude: this.props.appState.recvlat, longitude: this.props.appState.recvlng, ID: this.props.appState.ID}
    console.log("mark ", mark)
    if(this.props.appState.removeP){
      let array = this.props.appState.markers
      let index = array.indexOf(mark);
      array.splice(index, 1);
      this.setState({markers: array });
    }else{
      this.setState({ 
        markers: this.props.appState.markers.concat([mark])
      })
    }
  }


  handleMapClick = ({latLng}) => {
    this.setState({ userlat : latLng.lat() })
    this.setState({ userlng: latLng.lng() })
  }

 /* onDispMarkerClick = ({latLng}) => {
    this.setState{};
  }*/

  render() {
    return (
      <div>
        <InnerComponent
          handleMapClick={this.handleMapClick}
          displayLat = {this.props.appState.userlat}
          displayLng = {this.props.appState.userlng}
          markers = {this.props.appState.markers}
        />
        <div className="requestContainer">
          <button className="primaryButton" onClick={this.sendMarker}>
            Make Request
          </button>
        </div>
      </div>
    )
  }
}