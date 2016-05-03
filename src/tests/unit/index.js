/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* global before, after, describe, it, require */
import { expect } from 'chai';
import React from 'react';
import { provideContext, createElementWithContext }
  from 'fluxible-addons-react';
import Fluxible from 'fluxible';
import { domStart, domStop } from '../utils/testdom';
import { mocks } from '../mocks';
import { createFluxibleTestComponent } from '../fixtures/fluxible';
import { createStandardTestComponent } from '../fixtures/standard';
import { windowResizeReporter, fluxibleWindowResizeReporter } from '../../lib';

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
        expect(component.propTypes).to.have.property('actionCreator');
      });
    });

    it('should render react components, actionCreator via props', (done) => {
      const el = React.createElement(createStandardTestComponent(), {
        actionCreator: function () {
          expect(result.textContent).to.match(/test message/);
          done();
        }
      });
      const fragment = testUtils.renderIntoDocument(el);
      const result = testUtils.findRenderedDOMComponentWithClass(
        fragment, 'contained'
      );
    });

    it('should execute action from factory input', (done) => {
      const el = React.createElement(createStandardTestComponent(() => {
        done();
      }));
      testUtils.renderIntoDocument(el);
    });

    it('should execute action from property input', (done) => {
      const el = React.createElement(createStandardTestComponent(), {
        actionCreator: () => {
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
          this.actionCreator = this.actionCreator.bind(this);
        }
        actionCreator () {
          done();
        }
      }

      const el = React.createElement(ReactClass);
      testUtils.renderIntoDocument(el);
    });

    it('should throw if no actionCreator defined', () => {
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

    describe('options', () => {
      let mockDebounce, mockSizeReporter, mockWindowResizeReporter;

      before('options', () => {
        mocks.windowResizeReporter.begin();
        mockDebounce = require('lodash/debounce');
        mockSizeReporter = require('element-size-reporter');
        mockWindowResizeReporter =
          require('../../lib/window-resize').windowResizeReporter;
      });

      after('options', () => {
        mocks.windowResizeReporter.end();
      });

      it('should use debounce wait option if supplied', (done) => {
        const resizeWait = 20;
        const el = React.createElement(
          createStandardTestComponent(() => {
            const actualResizeWait = mockDebounce('_getResizeWait');
            expect(actualResizeWait).to.equal(resizeWait);
            done();
          }, resizeWait, null, mockWindowResizeReporter)
        );
        testUtils.renderIntoDocument(el);
      });

      it('should set element-size-reporter options', (done) => {
        const resizeReporterOptions = {
          test: 'option'
        };
        const el = React.createElement(
          createStandardTestComponent(() => {
            const actualSizeReporterOptions = mockSizeReporter('_getOptions');
            expect(actualSizeReporterOptions).to.eql(resizeReporterOptions);
            done();
          }, undefined, resizeReporterOptions, mockWindowResizeReporter)
        );
        testUtils.renderIntoDocument(el);
      });
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

    function render (sizeAction, options) {
      const component = provideContext(
        createFluxibleTestComponent(sizeAction, options)
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

    it('should remove actionCreator if supplied', (done) => {
      render(() => {
        done();
      }, {
        actionCreator: () => {
          done(new Error('Unexpected action invocation'));
        }
      });
    });

    it('should throw if no sizeAction is supplied', () => {
      expect(render).to.throw(Error);
    });
  });
});
