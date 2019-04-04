import React from 'react';
import DeckGL, {ScatterplotLayer, PathLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
import map from 'lodash/map'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg';

class DriveMap extends React.Component {

    findPath = (d) => {
        return [d.geoLng, d.geoLat]
    }

    _renderLayers() {
        const data = this.props.data;

        const pathData = map(data, this.findPath)
        console.log(pathData);
    
        return [
            new PathLayer({
                id: 'drive-path',
                data,
                pickable: false,
                widthScale: 10,
                widthMinPixels: 2,
                getPath: d => pathData,
                getColor: d => [127, 0, 255],
                getWidth: d => 2
            }),
            new ScatterplotLayer({
                id: 'scatter-plot',
                data,
                radiusScale: 10,
                radiusMinPixels: 0.25,
                getPosition: d => [d.geoLng, d.geoLat],
                getFillColor: d => [225, 0, 255],
                getRadius: 1
            })
        ];
      }
    
      render() {
        const {viewState, controller = true, baseMap = true} = this.props;

        const INITIAL_VIEW_STATE = {
            latitude: this.props.data[0].geoLat,
            longitude: this.props.data[0].geoLng,
            zoom: 15,
            pitch: 45,
            bearing: 0
        };
    
        return (
          <DeckGL
            layers={this._renderLayers()}
            initialViewState={INITIAL_VIEW_STATE}
            viewState={viewState}
            controller={controller}
          >
            {baseMap && (
              <StaticMap
                reuseMaps
                mapStyle="mapbox://styles/mapbox/dark-v9"
                preventStyleDiffing={true}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              />
            )}
          </DeckGL>
        );
      }
    }

export default DriveMap;