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
          height: 450,
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 12
        }
      };


    
      render() {
        return (
          <ReactMapGL mapboxApiAccessToken="pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg"
            {...this.state.viewport}
            mapStyle='mapbox://styles/mapbox/dark-v9'
            onViewportChange={(viewport) => this.setState({viewport})}>
                 <Marker 
                    longitude={-122.4376}
                    latitude={37.7577}
                    offsetTop={-20}
                    offsetLeft={-10} >
                    <Pin size={20} />
                </Marker>
            </ReactMapGL>
        
        );
      }
}
 
export default MapContainer