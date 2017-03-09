import React from 'react'
import { findDOMNode } from 'react-dom'
import srraf from 'srraf'

/**
 * @param {HTMLElement} node
 * @param {number} threshold Pixels outside viewport to fire
 * @param {number} y Current page scroll position
 */
function inViewport (node, threshold, y) {
  const windowHeight = window.innerHeight
  const viewTop = y
  const viewBot = viewTop + windowHeight

  const nodeTop = node.getBoundingClientRect().top + y
  const nodeBot = nodeTop + node.offsetHeight

  const offset = (threshold / 100) * windowHeight

  return (nodeBot >= viewTop - offset) && (nodeTop <= viewBot + offset)
}

/**
 * @param {number} threshold
 */
export default class Visibl extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  componentDidMount () {
    const node = findDOMNode(this)

    this.scroller = srraf.use(({ currY }) => {
      const visible = inViewport(node, this.props.threshold || 0, currY)
      if (visible && !this.state.visible) {
        this.setState({
          visible: true
        })
      } else if (!visible && this.state.visible) {
        this.setState({
          visible: false
        })
      }
    }).update()
  }

  componentWillUnmount () {
    if (this.scroller) {
      this.scroller.destroy()
    }
  }

  render () {
    return typeof this.props.children === 'function' ? (
      this.props.children(this.state.visible)
    ) : (
      React.cloneElement(this.props.children, this.state)
    )
  }
}
