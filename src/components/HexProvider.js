import { Component } from 'react'
import HexContext from './HexContext'
import HexImport from './HexContext'
import Orientation from './models/Orientation'

class HexProvider extends Component {
  static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0)
  static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)

  state = {
    // children: PropTypes.node,
    className: PropTypes.string,
    flat: PropTypes.bool,
    origin: PropTypes.object,
    size: PropTypes.object,
    spacing: PropTypes.number,
    points: PropTypes.string,
    childLayout: PropTypes.object
  }

  render () {
    return (
      <HexContext.Provider
        value={{
          // { children, flat, className, ...rest } : this.props

          flat: this.state.flat,
          orientation: (flat) ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY,
          cornerCoords: this.calculateCoordinates(orientation),
          points: cornerCoords.map(point => `${point.x},${point.y}`).join(' '),
          childLayout: Object.assign({}, rest, { orientation })
        }}
      >
        {this.props.children}
      </HexContext.Provider>
    )
  }

  getPointOffset (corner, orientation, size) {
    const angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
  }

  // TODO Refactor
  calculateCoordinates (orientation) {
    const corners = []
    const center = new Point(0, 0)
    const { size } = this.props

    Array.from(new Array(6), (x, i) => {
      const offset = this.getPointOffset(i, orientation, size)
      const point = new Point(center.x + offset.x, center.y + offset.y)
      corners.push(point)
    })

    return corners
  }
}

export default HexProvider
