/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 */
import React from 'react';
import { windowResizeReporter } from '../../lib';

export function createStandardTestComponent (actionExecutor) {
  const StandardTestComponent = React.createClass({
    render: function () {
      return (
        <div className="contained">
          <span>This is a test message</span>
        </div>
      );
    }
  });

  return windowResizeReporter(
    StandardTestComponent,
    '.contained', {
      actionExecutor
    }
  )
}
