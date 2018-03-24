import React from 'react'
import { findDOMNode } from 'react-dom'
import srraf from 'srraf'

/**
 * @param {HTMLElement} node
 * @param {number} threshold Pixels outside viewport to fire
 * @param {number} y Current page scroll position
 */
function inViewport (node, threshold, y) {
  const nodeTop = node.getBoundingClientRect().top + y
  const nodeBot = nodeTop + node.offsetHeight
  const offset = (threshold / 100) * window.innerHeight
  return (nodeBot >= y - offset) && (nodeTop <= (y + window.innerHeight) + offset)
}

/**
 * @param {number} threshold
 */
export default function visibl (Component) {
  return class Visibl extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        visible: false
      }
    }

    componentDidMount () {
      this.ref = findDOMNode(this)

      this.scroller = srraf(({ y }) => {
        const visible = inViewport(this.ref, this.props.threshold || 0, y)

        if (visible && !this.state.visible) {
          this.setState({ visible: true })
        } else if (!visible && this.state.visible) {
          this.setState({ visible: false })
        }
      }).update()
    }

    componentWillUnmount () {
      if (this.scroller) this.scroller.destroy()
    }

    render () {
      return <Component {...this.props} {...this.state} />
    }
  }
}
