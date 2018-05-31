# visibl
In-viewport detection via React HOC.

# Usage
```javascript
import React from 'react'
import { render } from 'react-dom'
import visibl from 'visibl'

const Component = React.forwardRef((props, ref) => {
  return (
    <h1 ref={ref}>I am {props.visible ? 'visible :)' : 'not visible :('}</h1>
  )
})

const TrackedComponent = visibl(Component)

function App () {
  return (
    <TrackedComponent />
  )
}

render(<App />, document.body)
```

### Adjusting Threshold
A fraction of the viewport height. Positive values makes image load sooner, negative values makes image load later.
```
<TrackedComponent threshold={0.2} />
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
