import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import Hex from './Hex'
import HexUtils from './HexUtils'
import { G, Polygon } from 'react-native-svg'

export default function Hexagon (props) {

  const [state, setState] = useState({
    pixel: undefined
  })

  useEffect(() => {
    reCalculateState(props)
  }, [props])

  function reCalculateState(p) {
    const { q, r, s, fill, stroke } = p
    const hex = new Hex(q, r, s)
    const pixel = HexUtils.hexToPixel(hex, p.layout)
    const { strokeWidth } = p.strokeWidth

    setState({
      hex,
      pixel,
      fill,
      stroke,
      strokeWidth
    })
  }

  function goToHexagonTarget() {
    props.showDetails(props.showText)
  }

  if (!state.pixel) {
    return (
      <G></G>
    )
  }

  if ((Platform.OS === 'ios') || (Platform.OS === 'android')) {
    return (
      <G transform={`translate(${state.pixel.x}, ${state.pixel.y})`}>
        <Polygon
          points={props.points}
          fill={state.fill}
          stroke={state.stroke}
          strokeWidth={state.strokeWidth}
          onPress={() => goToHexagonTarget()}
        />
        {props.children}
      </G>
    )
  } else {
    return (
      <G transform={`translate(${state.pixel.x}, ${state.pixel.y})`}>
        <Polygon
          points={props.points}
          fill={state.fill}
          stroke={state.stroke}
          strokeWidth={state.strokeWidth}
          onClick={() => goToHexagonTarget()}
        />
        {props.children}
      </G>
    )
  }
}
