/***
 * Copyright (c) 2016 - 2021 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 */
import React from 'react';
import { fluxibleWindowResizeReporter } from '../../lib';

export function createFluxibleTestComponent (sizeAction, options) {
  class FluxibleTestComponent extends React.Component {
    render () {
      return (
        <div className="contained">
          <span>This is a test message</span>
        </div>
      );
    }
  }

  return fluxibleWindowResizeReporter(
    FluxibleTestComponent,
    '.contained',
    sizeAction,
    options
  );
}
