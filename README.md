# React Size Reporter
> Higher order React components to report size of contained DOM elements.

Uses [size-reporter](https://github.com/localnerve/size-reporter) to report width, height, and top of contained DOM elements. Size data is logically group-able so that different components' DOM elements sizes can be accumulated together.

## API
```javascript
// Create a size reporter on window 'resize' event, reporting on DOM element
// found by `selector`.
createWindowResizeReporter(Component, selector, options)

// Create a size reporter on window 'resize' event, reporting on DOM element
// found by `selector`. Use with fluxible.
createFluxibleWindowResizeReporter(Component, selector, sizeAction, options)
```

## WIP
This is a work in progress. Do not use.
