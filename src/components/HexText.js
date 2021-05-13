import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text,StyleSheet} from 'react-native';
import Svg, { TSpan, Text as SvgText } from 'react-native-svg';

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
class HexText extends Component { 

  render() {
    const { children, x, y, className  } = this.props;
    const fontsize = this.props.fontSize || "5";
    const fillcolor = this.props.fill || "#000";
    const strokeColor = this.props.isStroke ? fillcolor : null;
    
    return (
      
        <SvgText x={x || 0} y={y ? y : '0.1em'} fill={fillcolor} fontWeight="bold" stroke={strokeColor} fontSize={fontsize} textAnchor="middle" >{children}</SvgText>
      
      );
  }
}

export default HexText;

