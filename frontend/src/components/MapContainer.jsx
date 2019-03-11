/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Rohan Rao
 * Contents of file: Maps container for showing maps on the dashboard
 */

import React, {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from './Pin';

 
export class MapContainer extends Component {

    state = {
        viewport: {
          width: "100%",
          height: "100%",
          latitude: 37.78,
          longitude: -122.41,
          zoom: 8
        }
      };

      constructor(props) {
        super(props);
        this.latitude = 0;
        this.longitude = 0;
    }
    
      render() {
        this.latitude = Number(this.props.latitude);
        this.longitude = Number(this.props.longitude);
        return (
          <ReactMapGL mapboxApiAccessToken="pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg"
            {...this.state.viewport}
            latitude={this.latitude}
            longitude={this.longitude}
            mapStyle='mapbox://styles/mapbox/dark-v9'
            onViewportChange={(viewport) => this.setState({viewport})}>
                 <Marker 
                    latitude={this.latitude}
                    longitude={this.longitude}
                    offsetTop={-20}
                    offsetLeft={-10} >
                    <Pin size={20} />
                </Marker>
            </ReactMapGL>
        
        );
      }
}
 
export default MapContainer