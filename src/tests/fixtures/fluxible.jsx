/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 */
import React from 'react';
import { fluxibleWindowResizeReporter } from '../../lib';

let sizeAction = function () {};
export function setMockAction (action) {
  sizeAction = action;
}

let FluxibleTestComponent = React.createClass({
  render: function () {
    return (
      <div className="contained">
        <span>This is a test message</span>
      </div>
    );
  }
});

FluxibleTestComponent = fluxibleWindowResizeReporter(
  FluxibleTestComponent,
  '.contained',
  sizeAction
);

export {
  FluxibleTestComponent
}
