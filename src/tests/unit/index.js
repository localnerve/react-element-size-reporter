/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 * TODO: finish tests.
 */
/* global before, beforeEach, after, afterEach, describe, it */
import { expect } from 'chai';
import React from 'react';
import { domStart, domStop, mockStart, mockEnd } from '../utils/testdom';
import {
  FluxibleTestComponent, setMockAction
} from '../fixtures/fluxible';
import {
  StandardTestComponent, setMockActionExecutor
} from '../fixtures/standard';
import {
  windowResizeReporter, fluxibleWindowResizeReporter
} from '../../lib';

describe('react size reporter', () => {
  let testUtils;

  before('react size reporter', () => {
    domStart();
    testUtils = require('react-addons-test-utils');
  });

  after('react size reporter', () => {
    domStop();
  });

  function expectedMembers (element) {
    // life cycle methods
    expect(element).to.respondTo('render');
    expect(element).to.respondTo('componentDidMount');
    expect(element).to.respondTo('componentWillUnmount');

    // all elements have this
    expect(element.displayName).to.be.a('string').that.is.not.empty;
  }

  describe('window resize', () => {
    describe('structure', () => {
      it('should have life cycle methods', () => {
        const el = new windowResizeReporter();
        expectedMembers(el);
        expect(el.propTypes).to.be.an('object').that.is.not.empty;
      });
    });

    it('should render react components', () => {
      const el = React.createElement(StandardTestComponent);
      const fragment = testUtils.renderIntoDocument(el);
      const result = testUtils.findRenderedDOMComponentWithClass(
        fragment, 'contained'
      );
      expect(result.textContent).to.match(/test message/);
    });
  });

  describe('fluxible window resize', () => {
    describe('structure', () => {
      it('should have life cycle methods', () => {
        const el = new fluxibleWindowResizeReporter();
        expectedMembers(el);
        expect(el.contextTypes).to.be.an('object').that.is.not.empty;
      });
    });

    it('should render react components', () => {
      const el = React.createElement(FluxibleTestComponent);
      const fragment = testUtils.renderIntoDocument(el);
      const result = testUtils.findRenderedDOMComponentWithClass(
        fragment, 'contained'
      );
      expect(result.textContent).to.match(/test message/);
    });

    it.skip('should execute action', (done) => {
    });

    it.skip('should accumulate if multiple reporters in same group', (done) => {
    });
  });
});
