import React, { Component } from 'react'
import { Platform } from 'react-native'
import Hex from './Hex'
import HexUtils from './HexUtils'
import { G, Polygon } from 'react-native-svg'

class Hexagon extends Component {
  constructor (props) {
    super(props)

    this.reCalculateState()
  }

  reCalculateState () {
    const { q, r, s } = this.props
    const hex = new Hex(q, r, s)
    const pixel = HexUtils.hexToPixel(hex, this.props.layout)

    this.state = { hex, pixel }
  }

  onClick (e) {
    if (this.props.onClick) {
      this.props.onClick(e, this)
    }
  }

  render () {
    this.reCalculateState()
    const { fill, stroke } = this.props
    const { pixel } = this.state
    const { strokeWidth } = this.props.strokeWidth

    if ((Platform.OS === 'ios') || (Platform.OS === 'android')) {
      return (
        <G transform={`translate(${pixel.x}, ${pixel.y})`}>
          <Polygon
            points={this.props.points}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            onPress={() => this.props.showDetails(this.props.showText)}
          />
          {this.props.children}
        </G>
      )
    } else {
      return (
        <G transform={`translate(${pixel.x}, ${pixel.y})`}>
          <Polygon
            points={this.props.points}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            onClick={() => this.props.showDetails(this.props.showText)}
          />
          {this.props.children}
        </G>
      )
    }
  }
}

export default Hexagon
