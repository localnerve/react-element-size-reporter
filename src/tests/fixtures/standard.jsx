/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 */
import React from 'react';
import { windowResizeReporter } from '../../lib';

let mockActionExecutor = null;
function actionExecutor () {
  if (mockActionExecutor) {
    mockActionExecutor.apply(this, arguments);
  }
}
export function setMockActionExecutor (actionExecutor) {
  mockActionExecutor = actionExecutor;
}

let StandardTestComponent = React.createClass({
  render: function () {
    return (
      <div className="contained">
        <span>This is a test message</span>
      </div>
    );
  }
});

StandardTestComponent = windowResizeReporter(
  StandardTestComponent,
  '.contained', {
    actionExecutor
  }
);

export {
  StandardTestComponent
}
