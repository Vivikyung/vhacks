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
          //key={marker.photo_id}
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
  state = {
    markers : [],
    userlat : 0.00,
    userlng : 0.00,
    mst : "",
    recvlat : 0.00,
    recvlng : 0.00,
  }

  @autobind
  sendMarker() {
    console.log(this.state.userlat);
    const data = {lat: this.state.userlat, lng: this.state.userlng};
    this.props.appState.ws.send(JSON.stringify(data));
  }

  @autobind
  setMarkers(this) {
    this.props.appState.ws.onmessage = function(event){
        console.log(event)
        let data = JSON.parse(event.data)
        switch (data.type) {
          case 'lat':
            this.setState({recvlat : data.lat})
            break;
          case 'lng':
            this.setState({recvlng : data.lng})
            break;
          default:
            break;
        }
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
          displayLat = {this.state.userlat}
          displayLng = {this.state.userlng}
          markers = {this.state.markers}
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