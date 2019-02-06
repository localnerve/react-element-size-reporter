/***
 * Copyright (c) 2016 - 2019 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* global require */
import mockery from 'mockery';
import debounce from './debounce';
import elementSizeReporter from './element-size-reporter';

export const mocks = Object.create(null);

function mockModuleBegin (mocks) {
  mocks.forEach(function (mock) {
    mockery.registerMock(mock.pattern, mock.module);
  });

  mockery.enable({
    useCleanCache: true,
    warnOnUnregistered: false
  });
}

function mockModuleEnd (mocks) {
  mockery.disable();

  mocks.forEach(function (mock) {
    mockery.deregisterMock(mock.pattern);
  });
}

[{
  name: 'windowResizeReporter',
  mocks: [{
    pattern: 'lodash/debounce',
    module: debounce
  },{
    pattern: 'element-size-reporter',
    module: elementSizeReporter
  }]
}].forEach(function (mockSpec) {
  mocks[mockSpec.name] = {
    begin: function () {
      mockModuleBegin(mockSpec.mocks);
    },
    end: function () {
      mockModuleEnd(mockSpec.mocks);
    }
  };
});
