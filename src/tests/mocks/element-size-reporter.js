/***
 * Copyright (c) 2016 - 2018 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */

let elementSizeReporterOptions;

export default function
elementSizeReporter (selector, actionCreator, options) {
  if (selector === '_getOptions') {
    return elementSizeReporterOptions;
  }
  elementSizeReporterOptions = options;
  return actionCreator;
}
