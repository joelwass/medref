import React from 'react'
import { Platform } from 'react-native'
import { Text as SvgText } from 'react-native-svg'

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
export default function HexText (props) {
  const { children, x, y, className } = props
  const fontsize = props.fontSize || '5'
  const fillcolor = props.fill || '#000'
  const strokeColor = props.isStroke ? fillcolor : null

  if ((Platform.OS === 'ios') || (Platform.OS === 'android')) {
    return (
      <SvgText
        x={x || 0}
        y={y || 1}
        fill={fillcolor}
        onPress={() => props.showDetails(props.showText)}
        fontWeight='bold'
        stroke={strokeColor}
        fontSize={fontsize}
        textAnchor='middle'
      >
        {children}
      </SvgText>
    )
  } else {
    return (
      <SvgText
        x={x || 0}
        y={y || 1}
        fill={fillcolor}
        onClick={() => props.showDetails(props.showText)}
        fontWeight='bold'
        stroke={strokeColor}
        fontSize={fontsize}
        textAnchor='middle'
      >
        {children}
      </SvgText>
    )
  }
}
