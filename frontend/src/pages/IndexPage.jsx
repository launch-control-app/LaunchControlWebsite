/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Serves as the landing page that shows authorization information (sign up/log in)
 * Base port of the background map can be found here: https://github.com/uber/deck.gl/tree/6.4-release/examples/website/trips
 */
import React, {Component} from 'react';
import AuthBox from '../components/AuthBox'
import {StaticMap} from 'react-map-gl';
import DeckGL, {PolygonLayer} from 'deck.gl';
import {TripsLayer} from '@deck.gl/experimental-layers';
import { Grid } from 'semantic-ui-react';

import './IndexPage.css';

const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json' // eslint-disable-line
};

const LIGHT_SETTINGS = {
  lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
  ambientRatio: 0.05,
  diffuseRatio: 0.6,
  specularRatio: 0.8,
  lightsStrength: [2.0, 0.0, 0.0, 0.0],
  numberOfLights: 2
};

export const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 13,
  maxZoom: 16,
  pitch: 45,
  bearing: 0
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
    const {buildings = DATA_URL.BUILDINGS, trips = DATA_URL.TRIPS, trailLength = 180} = this.props;
    return [
      new TripsLayer({
        id: 'trips',
        data: trips,
        getPath: d => d.segments,
        getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.3,
        strokeWidth: 2,
        trailLength,
        currentTime: this.state.time
      }),
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        fp64: true,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: [74, 80, 87],
        lightSettings: LIGHT_SETTINGS
      })
    ];
  }

  render() {
    
    const {viewState, controller = false, baseMap = true} = this.props;

    return (
      <div className="appcontent" style={{background: "#1F1F28"}}>
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
              mapboxApiAccessToken="pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg"
            />
          )}
        </DeckGL>

        <Grid columns={2} centered style={{marginTop: '30vh'}}>
            <Grid.Column>
              <h1 className="homeTitle">Launch Control</h1>
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