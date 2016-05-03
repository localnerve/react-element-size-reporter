/**
 * Copyright (c) 2015, 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 * Start/stop jsdom environment
 */
/* global global, document */
import jsdomLib from 'jsdom';
const jsdom = jsdomLib.jsdom;

/**
 * Shim document, window, and navigator with jsdom if not defined.
 * Init document with markup if specified.
 * Add globals if specified.
 */
export function domStart (markup, addGlobals) {
  if (typeof document !== 'undefined') {
    return;
  }

  const globalKeys = [];

  global.document = jsdom(markup || '<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;

  if (addGlobals) {
    Object.keys(addGlobals).forEach(function (key) {
      global.window[key] = addGlobals[key];
      globalKeys.push(key);
    });
  }

  return globalKeys;
}

/**
 * Remove globals
 */
export function domStop (globalKeys) {
  if (globalKeys) {
    globalKeys.forEach(function (key) {
      delete global.window[key];
    });
  }

  delete global.document;
  delete global.window;
  delete global.navigator;
}
