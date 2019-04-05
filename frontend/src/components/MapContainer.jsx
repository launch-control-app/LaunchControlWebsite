/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Rohan Rao
 * Contents of file: Maps container for showing maps on the dashboard
 */

import React, {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from './Pin';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg';

export class MapContainer extends Component {

  state = {
    viewport: {
      latitude: 37.78,
      longitude: -122.41,
      zoom: 8
    }
  };

  onViewportChange = viewport => { 
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  } 

  render() {
    const latitude = Number(this.props.latitude);
    const longitude = Number(this.props.longitude);
    return (
      <ReactMapGL
        width="100%"
        height="100%"
        style={{padding: "10px 0px 0px 10px"}}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        {...this.state.viewport}
        latitude={latitude}
        longitude={longitude}
        offsetLeft={0}
        offsetTop={0}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={viewport => this.onViewportChange(viewport)}>
        <Marker latitude={latitude} longitude={longitude}>
          <Pin size={30}/>
        </Marker>
      </ReactMapGL>
    );
  }
}

export default MapContainer