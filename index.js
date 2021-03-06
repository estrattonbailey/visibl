import React from 'react'
import srraf from 'srraf'

function pick (src, pick) {
  let keys = Object.keys(src)

  let picked = {}
  let rest = {}

  for (let i = 0; i < keys.length; i++) {
    if (pick.indexOf(keys[i]) > -1) {
      picked[keys[i]] = src[keys[i]]
    } else {
      rest[keys[i]] = src[keys[i]]
    }
  }

  return {
    picked,
    rest
  }
}

/**
 * @param {HTMLElement} node
 * @param {number} threshold Pixels outside viewport to fire
 * @param {number} y Current page scroll position
 */
function inViewport (node, threshold, y) {
  const nodeTop = node.getBoundingClientRect().top + y
  const nodeBot = nodeTop + node.offsetHeight
  const offset = threshold * window.innerHeight
  return (nodeBot >= y - offset) && (nodeTop <= (y + window.innerHeight) + offset)
}

/**
 * @param {number} threshold
 */
export default function visibl (Component) {
  class Visibl extends React.Component {
    constructor (props) {
      super(props)

      this.setConfig()

      this.state = {}

      this.ref = React.createRef()
    }

    setConfig () {
      const { picked, rest } = pick(
        Object.assign({}, this.props, {
          threshold: this.props.threshold || 0
        }),
        [ 'threshold' ]
      )

      this.options = picked
      this.rest = rest
    }

    update (y = window.pageYOffset) {
      const visible = inViewport(this.ref.current, this.options.threshold, y)

      visible && this.setState({ visible })

      return visible
    }

    cleanup () {
      this.scroller && this.scroller.destroy()
    }

    componentDidMount () {
      if (!this.update()) {
        this.scroller = srraf(({ y }) => {
          if (this.update(y)) this.cleanup()
        }).update()
      }
    }

    componentWillUnmount () {
      this.cleanup()
    }

    render () {
      return <Component ref={this.ref} {...this.rest} {...this.state} />
    }
  }

  return Visibl
}
