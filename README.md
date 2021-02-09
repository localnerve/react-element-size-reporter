# React Element Size Reporter

[![npm version](https://badge.fury.io/js/react-element-size-reporter.svg)](http://badge.fury.io/js/react-element-size-reporter)
![Verify](https://github.com/localnerve/react-element-size-reporter/workflows/Verify/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/localnerve/react-element-size-reporter/badge.svg?branch=master)](https://coveralls.io/github/localnerve/react-element-size-reporter?branch=master)
[![Dependency Status](https://david-dm.org/localnerve/react-element-size-reporter.svg)](https://david-dm.org/localnerve/react-element-size-reporter)
[![devDependency Status](https://david-dm.org/localnerve/react-element-size-reporter/dev-status.svg)](https://david-dm.org/localnerve/react-element-size-reporter#info=devDependencies)

> Higher order React components to report size of contained DOM elements.

Uses [element-size-reporter](https://github.com/localnerve/element-size-reporter) to report width, height, and top of contained DOM elements. Size Reports are logically group-able so that different components' DOM elements sizes can be accumulated together in a flux flow.

## Demo and Example
If you are interested in seeing demo code usage and/or a staged demo, please review [this brief thread](https://github.com/localnerve/react-element-size-reporter/issues/40) covering this topic.  

## API
```javascript
windowResizeReporter(Component, selector, options)

fluxibleWindowResizeReporter(Component, selector, sizeAction, options)
```

### windowResizeReporter
Creates a higher order component that reports on window 'resize' event. Reports on the element found by the supplied `selector`. When the window 'resize' event occurs, a [Size Report](https://github.com/localnerve/element-size-reporter#size-report) is delivered to an action creator supplied by one of three methods. The first viable action creator found is used, here is the search order:

1. Action creator supplied in options, name `actionCreator`.

2. Action creator supplied in props, name `actionCreator`.

3. Action creator found on the higher order component instance (can supplied by a derived class, method named `actionCreator`).

#### Parameters
`Component` {ReactComponent} - The React Component to render.

`selector` {String} - Selects the DOM element to report the size about.

`options` {Object} - The window resize and reporting options.
  * `actionCreator` {Function} - Creates an action on window resize. Receives a [Size Report](https://github.com/localnerve/element-size-reporter#size-report).

  * `resizeWait` {Number} - Resize debouncer trailing wait in milliseconds. Defaults to 100ms.

  * `sizeReporter` {Object} - [element-size-reporter options](https://github.com/localnerve/element-size-reporter#options)

### fluxibleWindowResizeReporter
Same as [windowResizeReporter](#windowResizeReporter), but for use with [Fluxible](http://fluxible.io). Creates a higher order component that reports on window 'resize' event. Reports on the element found by the supplied `selector`. When the window 'resize' event occurs, a [Size Report](https://github.com/localnerve/element-size-reporter#size-report) is delivered to the supplied `sizeAction` creator.

#### Parameters
`Component` {ReactComponent} - The React Component to render.

`selector` {String} - Selects the DOM element to report the size about.

`sizeAction` {Function} - The action creator that receives the [Size Report](https://github.com/localnerve/element-size-reporter#size-report).

`options` {Object} - The window resize and reporting options. Same as [windowResizeReporter](#windowResizeReporter), except the actionCreator option is ignored - it is supplied explicitly via `sizeAction`.

* `resizeWait` {Number} - Resize debouncer trailing wait in milliseconds. Defaults to 100ms.

* `sizeReporter` {Object} - [element-size-reporter options](https://github.com/localnerve/element-size-reporter#options)
