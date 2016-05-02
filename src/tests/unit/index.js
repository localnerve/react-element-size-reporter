/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* global before, beforeEach, after, afterEach, describe, it */
import { expect } from 'chai';
import React from 'react';
import { provideContext, createElementWithContext }
  from 'fluxible-addons-react';
import Fluxible from 'fluxible';
import { domStart, domStop, mockStart, mockEnd } from '../utils/testdom';
import { createFluxibleTestComponent } from '../fixtures/fluxible';
import { createStandardTestComponent } from '../fixtures/standard';
import { windowResizeReporter,fluxibleWindowResizeReporter } from '../../lib';

describe('react size reporter', () => {
  let testUtils;

  before('react size reporter', () => {
    domStart();
    testUtils = require('react-addons-test-utils');
  });

  after('react size reporter', () => {
    domStop();
  });

  function expectedMembers (component) {
    // life cycle methods
    expect(component).to.respondTo('render');
    expect(component).to.respondTo('componentDidMount');
    expect(component).to.respondTo('componentWillUnmount');

    // all components have displayName
    expect(component.displayName).to.be.a('string').that.is.not.empty;
  }

  describe('window resize', () => {
    describe('structure', () => {
      it('should have life cycle methods', () => {
        const component = new windowResizeReporter();
        expectedMembers(component);
        expect(component.propTypes).to.be.an('object').that.is.not.empty;
        expect(component.propTypes).to.have.property('actionExecutor');
      });
    });

    it('should render react components, actionExecutor via props', () => {
      const el = React.createElement(createStandardTestComponent(), {
        actionExecutor: function () {}
      });
      const fragment = testUtils.renderIntoDocument(el);
      const result = testUtils.findRenderedDOMComponentWithClass(
        fragment, 'contained'
      );
      expect(result.textContent).to.match(/test message/);
    });

    it('should execute action from factory input', (done) => {
      const el = React.createElement(createStandardTestComponent(() => {
        done();
      }));
      testUtils.renderIntoDocument(el);
    });

    it('should execute action from property input', (done) => {
      const el = React.createElement(createStandardTestComponent(), {
        actionExecutor: () => {
          done();
        }
      });
      testUtils.renderIntoDocument(el);
    });

    it('should execute action from instance', (done) => {
      const BaseClass = createStandardTestComponent();
      class ReactClass extends BaseClass {
        constructor () {
          super();
          this.state = {};
          this.actionExecutor = this.actionExecutor.bind(this);
        }
        actionExecutor () {
          done();
        }
      }

      const el = React.createElement(ReactClass);
      testUtils.renderIntoDocument(el);
    });

    it('should throw if no actionExecutor defined', () => {
      const el = React.createElement(createStandardTestComponent());
      expect(function () {
        testUtils.renderIntoDocument(el);
      }).to.throw(Error);
    });

    it('should supply some sort of report data object', (done) => {
      const el = React.createElement(
        createStandardTestComponent((data) => {
          expect(data).to.be.an('object').that.is.not.empty;
          done();
        })
      );
      testUtils.renderIntoDocument(el);
    });
  });

  describe('fluxible window resize', () => {
    describe('structure', () => {
      it('should have life cycle methods', () => {
        const component = new fluxibleWindowResizeReporter(null, '', () => {});
        expectedMembers(component);
        expect(component.contextTypes).to.be.an('object').that.is.not.empty;
        expect(component.contextTypes).to.have.property('executeAction');
      });
    });

    function render (sizeAction) {
      const component = provideContext(
        createFluxibleTestComponent(sizeAction)
      );
      const context = (
        new Fluxible({ component })
      ).createContext();
      const el = createElementWithContext(context);
      const fragment = testUtils.renderIntoDocument(el);
      const result = testUtils.findRenderedDOMComponentWithClass(
        fragment, 'contained'
      );
      expect(result.textContent).to.match(/test message/);
    }

    it('should render fluxible components', () => {
      render(() => {});
    });

    it('should render and execute sizeAction', (done) => {
      render((data) => {
        expect(data).to.be.an('object').that.is.not.empty;
        done();
      });
    });

    it.skip('should accumulate if multiple reporters in same group', (done) => {
    });
  });
});
