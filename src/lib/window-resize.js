/***
 * Copyright (c) 2016, 2017 Alex Grant (@localnerve), LocalNerve LLC
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
import createSizeReporter from 'element-size-reporter';

const defaultResizeWait = 100;

/**
 * Factory to create the WindowResizeReporter Class.
 *
 * @param {Component} Component - The react component to render.
 * @param {String} selector - The selector of the DOM element to report
 * size on.
 * @param {Object} [options] - WindowResizeReporter options.
 * @param {Function} [options.actionCreator] - A function to execute an action
 * on resize. It will receive an Object that contains the size report data.
 * If omitted, looks for actionCreator:
 *   1. In props.
 *   2. On instance.
 * @param {Number} [options.resizeWait] - Trailing debounce resize wait
 * (milliseconds).
 * @param {Object} [options.sizeReporter] - sizeReporter options.
 * @returns {Component} A higher order component with a window resize element
 * reporter.
 */
export function windowResizeReporter (Component, selector, options) {
  options = options || {};
  options.resizeWait = typeof options.resizeWait !== 'number' ?
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
    actionCreator: React.PropTypes.func
  };

  Object.assign(WindowResizeReporter.prototype, {
    render: function () {
      return React.createElement(Component, this.props);
    },
    componentWillUnmount: function () {
      window.removeEventListener('resize', this._resizeHandler);
    },

    /**
     * Queue actionCreator task on componentDidMount.
     * Also, run actionCreator on window resize events.
     */
    componentDidMount: function () {
      const actionCreator = options.actionCreator ||
        this.props.actionCreator ||
        this.actionCreator;

      if (!actionCreator) {
        throw new Error(
          'actionCreator not supplied via factory, instance, or props'
        );
      }

      const reporter = createSizeReporter(
        selector, actionCreator, options.sizeReporter
      );

      this._resizeHandler = debounce(reporter, options.resizeWait);

      window.addEventListener('resize', this._resizeHandler);

      // Queue Report now
      setTimeout(reporter, 0);
    }
  });

  return WindowResizeReporter;
}
