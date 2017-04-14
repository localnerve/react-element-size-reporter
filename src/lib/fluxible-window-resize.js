/***
 * Copyright (c) 2016, 2017 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License.
 * See the accompanying LICENSE file for terms.
 *
 * A higher order component to execute fluxible action on window resize.
 */
import React from 'react';
import PropTypes from 'prop-types';
import inherits from 'inherits';
import { windowResizeReporter } from './window-resize';

/**
 * Factory to create the WindowResizeReporter HOC for fluxible.
 *
 * @param {Component} Component - The inner react class to wrap.
 * @param {String} selector - The selector to find the DOM elements to report
 * size on.
 * @param {Function} sizeAction - A size action creator. It will receive an
 * Object that contains the size report data from size-reporter.
 * @param {Object} [options] - window resize options.
 * @returns {Component} A fluxible action aware higher order component with a
 * window resize element reporter.
 */
export function fluxibleWindowResizeReporter (
  Component, selector, sizeAction, options
) {
  if (typeof sizeAction !== 'function') {
    throw new Error(
      'Invalid sizeAction supplied to fluxibleWindowResizeReporter'
    );
  }

  if (options && options.actionCreator) {
    delete options.actionCreator;
  }

  /**
   * @constructor
   */
  function FluxibleWindowResizeReporter () {
    React.Component.apply(this, arguments);
    this.actionCreator =
      FluxibleWindowResizeReporter.prototype.actionCreator.bind(this);
  }

  inherits(
    FluxibleWindowResizeReporter,
    windowResizeReporter(Component, selector, options)
  );

  FluxibleWindowResizeReporter.displayName = 'FluxibleWindowResizeReporter';
  FluxibleWindowResizeReporter.contextTypes = {
    executeAction: PropTypes.func.isRequired
  };

  Object.assign(FluxibleWindowResizeReporter.prototype, {
    actionCreator: function (sizeData) {
      this.context.executeAction(sizeAction, sizeData);
    }
  });

  return FluxibleWindowResizeReporter;
}
