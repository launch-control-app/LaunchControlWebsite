/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Serves as the landing page that shows authorization information (sign up/log in)
 * Base port of the background map can be found here: https://github.com/uber/deck.gl/tree/6.4-release/examples/website/trips
 */
import React, {Component} from 'react';
import AuthBox from '../components/AuthBox'
import {StaticMap} from 'react-map-gl';
import DeckGL from 'deck.gl';
import {TripsLayer} from '@deck.gl/experimental-layers';
import { Grid } from 'semantic-ui-react';

import './IndexPage.css';

export const INITIAL_VIEW_STATE = {
  latitude: 53.522082,
  longitude: -113.529615,
  zoom: 15,
  pitch: 45,
  bearing: 45
};

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this._animate();
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _onMapLoad = () => {
    const map = this._map;

    var layers = map.getStyle().layers;
 
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
      }
    }
    map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 1,
      'paint': {
      'fill-extrusion-color': '#495057',
       
      'fill-extrusion-height': [
        "interpolate", ["linear"], ["zoom"],
        10, 0,
        10.05, ["get", "height"]
      ],
      'fill-extrusion-base': [
        "interpolate", ["linear"], ["zoom"],
        10, 0,
        10.05, ["get", "min_height"]
      ],
      'fill-extrusion-opacity': .8
      }}
      , labelLayerId);
  }

  _animate() {
    const {
      loopLength = 1800, // unit corresponds to the timestamp in source data
      animationSpeed = 30 // unit time per second
    } = this.props;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;

    this.setState({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    });
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
  }

  _renderLayers() {
    let tripsUrl;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      tripsUrl = 'http://localhost:4000/trips.json';
    } else {
      tripsUrl = window.location.protocol + '//' + window.location.host + '/trips.json';
    }
    const {trailLength = 180} = this.props;
    return [
      new TripsLayer({
        id: 'trips',
        data: tripsUrl,
        getPath: d => d.segments,
        getColor: d => [127, 0, 255],
        opacity: 0.3,
        strokeWidth: 2,
        trailLength,
        currentTime: this.state.time
      })
    ];
  }

  render() {
    
    const {viewState, controller = false, baseMap = true} = this.props;

    return (
      <div className="appcontent" style={{background: "#1F1F28"}}>
         <DeckGL
         ref={ref => {
            // save a reference to the Deck instance
            this._deck = ref && ref.deck;
          }}
          layers={this._renderLayers()}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={viewState}
          controller={controller}
        >
          {baseMap && (
            <StaticMap
              reuseMaps
              ref={ref => {
                // save a reference to the mapboxgl.Map instance
                this._map = ref && ref.getMap();
              }}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              preventStyleDiffing={true}
              onLoad={this._onMapLoad}
              mapboxApiAccessToken="pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg"
            />
          )}
        </DeckGL>

        <Grid columns={2} centered style={{marginTop: '30vh'}}>
            <Grid.Column>
              <h1 className="homeTitle">Launch Control</h1>
              <h3 className="homeSubtitle">Vehicle Management Platform</h3>
            </Grid.Column>
            <Grid.Column>
              <AuthBox />
            </Grid.Column>        
        </Grid>
      </div>
    );
  }
}

export default IndexPage;