import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import Svg, { TSpan, Text as SvgText } from 'react-native-svg'

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
class HexText extends Component {
  static propTypes = {
    children: PropTypes.string,
    x: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    y: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    className: PropTypes.string

  }

  render () {
    const { children, x, y, className } = this.props
    const fontsize = this.props.fontSize || '5'

    return (
      <TSpan x={x || 0} y={y || '0.1em'}>
        <SvgText x={x || 0} y={y || '0.1em'} fill='#000' fontWeight='bold' fontSize={fontsize} textAnchor='middle' onPress={() => alert('Clicked Text')}>{children}</SvgText>
      </TSpan>

    )
  }
}

export default HexText

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 5
  }
})
