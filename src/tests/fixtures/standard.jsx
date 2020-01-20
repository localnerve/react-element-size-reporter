/***
 * Copyright (c) 2016 - 2020 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 */
import React from 'react';
import { windowResizeReporter } from '../../lib';

export function createStandardTestComponent (
  actionCreator, resizeWait, sizeReporterOptions, mockWindowResizeReporter
) {
  class StandardTestComponent extends React.Component {
    render () {
      return (
        <div className="contained">
          <span>This is a test message</span>
        </div>
      );
    }
  }

  const reporterFactory = mockWindowResizeReporter || windowResizeReporter;

  return reporterFactory(
    StandardTestComponent,
    '.contained', {
      actionCreator,
      resizeWait,
      sizeReporter: sizeReporterOptions
    }
  );
}
