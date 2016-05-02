/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License.
 * See the accompanying LICENSE file for terms.
 *
 * A higher order component to report rendered DOM element size.
 * Reports at componentDidMount and on window resize event.
 */
/* global window */
import React from 'react';
import inherits from 'inherits';
import debounce from 'lodash/debounce';
import createSizeReporter from 'size-reporter';

const defaultResizeWait = 100;

/**
 * Factory to create the WindowResizeReporter Class.
 *
 * @param {Component} Component - The react component to render.
 * @param {String} selector - The selector of the DOM element to report
 * size on.
 * @param {Object} [options] - WindowResizeReporter options.
 * @param {Function} [options.actionExecutor] - A function to execute an action
 * on resize. It will receive an Object that contains the size report data.
 * If omitted, looks for actionExecutor:
 *   1. On instance.
 *   2. In props.
 * @param {Number} [options.resizeWait] - Trailing debounce resize wait
 * (milliseconds).
 * @param {Object} [options.sizeReporter] - sizeReporter options.
 */
export function windowResizeReporter (Component, selector, options) {
  options = options || {};
  options.resizeWait = typeof options.resizeWait === 'undefined' ?
    defaultResizeWait : options.resizeWait;

  /**
   * WindowResizeReporter constructor
   * @constructor
   */
  function WindowResizeReporter () {
    React.Component.apply(this, arguments);
  }

  inherits(WindowResizeReporter, React.Component);

  WindowResizeReporter.displayName = 'WindowResizeReporter';
  WindowResizeReporter.propTypes = {
    actionExecutor: React.PropTypes.func
  };

  Object.assign(WindowResizeReporter.prototype, {
    render: function () {
      return React.createElement(Component, this.props);
    },
    componentWillUnmount: function () {
      window.removeEventListener('resize', this._resizeHandler);
    },

    /**
     * Queue actionExecutor task on componentDidMount.
     * Also, run actionExecutor on window resize events.
     */
    componentDidMount: function () {
      const actionExecutor = options.actionExecutor || this.actionExecutor ||
        this.props.actionExecutor;

      if (!actionExecutor) {
        throw new Error(
          'actionExecutor not supplied via factory, instance, or props'
        );
      }

      const reporter = createSizeReporter(
        selector, actionExecutor, options.sizeReporter
      );

      this._resizeHandler = debounce(reporter, options.resizeWait);

      window.addEventListener('resize', this._resizeHandler);

      // Queue Report now
      setTimeout(reporter, 0);
    }
  });

  return WindowResizeReporter;
}
