/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Rohan Rao
 * Modifications By: Nathan
 * Contents of file: A small pin to place on map
 * BASED ON: https://github.com/uber/react-map-gl/blob/8e51956d1133e8507892e6f187e9b5b77c0a8a33/examples/draggable-markers/src/pin.js
 * Icon pulled from https://lottiefiles.com/301-search-location
 */

import React, {PureComponent} from 'react';
import Lottie from 'lottie-react-web';
import MapPing from '../mapPing.json';

export default class Pin extends PureComponent {

  render() {
    const {size = 20} = this.props;

    return (
      <Lottie
        options={{
          animationData: MapPing
        }}
        height={size}
        width={size}
      />
    );
  }
}