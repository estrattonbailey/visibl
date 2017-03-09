import React from 'react'
import { render } from 'react-dom'
import Visibl from '../package/dist/index.js'

render(
  <div>
    <Visibl>
      {(visible) => (
        <h1 style={{
          padding: '2em',
          background: 'tomato',
        }}>Hello {visible ? 'world!' : 'noop.'}</h1>
      )}
    </Visibl>
  </div>,
  document.getElementById('root')
)
