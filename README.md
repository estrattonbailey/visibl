# visibl
1kb declarative in-viewport React HOC.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Features
1. Uses [srraf](https://github.com/estrattonbailey/srraf) for performant scrolling and resizing using `requestAnimationFrame`
2. Supports server environments and SSR
3. Sooper small 😎

## Usage
Use visibl with child functions, or with components.
```javascript
import Visibl from 'visibl'

/**
 * Child function
 */
const MyComp = props => (
  <Visibl>
    {(visible) => (
      <h1>I am {visible ? 'visible.' : 'not visible.'}</h1>
    )}
  </Visibl>
)

/**
 * Child function
 */
const Heading = ({ visible }) => (
  <h1>I am {visible ? 'visible.' : 'not visible.'}</h1>
)
const MyComp = props => (
  <Visibl>
    <Heading/>
  </Visibl>
)
```

## API
Visibl only accepts a single parameter, `threshold`.

### threshold
Threshold is the percent-of-viewport value above or below the viewport that `visible` is triggered. Positive values will fire sooner, negative values will fire later. In the example below, `visible` will be triggered 50% of the viewport *before* the element is actually visible.
```javascript
<Visibl threshold={50}>
  <Heading/>
</Visibl>
```

## Notes
Visibl only supports watching vertical scroll events and window resize events. Horizontal scroll is outside its scope.

## Browser Support
TODO, but should work in all evergreen browsers and IE 10+.

## Example
To run the example, clone this repo, then:
```bash
# move into example dir
cd relaze/example
# install deps
npm i
# compile JS
npm run js:build # or js:watch
# serve index.html and update with changes
live-server 
```

MIT License
