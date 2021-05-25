import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text,StyleSheet, Platform} from 'react-native';
import Svg, { TSpan, Text as SvgText } from 'react-native-svg';

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
class HexText extends Component { 

  render() {
    const { children, x, y, className  } = this.props;
    const fontsize = this.props.fontSize || "5";
    const fillcolor = this.props.fill || "#000";
    const strokeColor = this.props.isStroke ? fillcolor : null;
    
    
    if ((Platform.OS === 'ios' ) || (Platform.OS === 'android')) {
    
    return (
      
        <SvgText x={x || 0} y={y ? y : '0.1em'} fill={fillcolor} onPress={() => this.props.showDetails(this.props.showText)} fontWeight="bold" stroke={strokeColor} fontSize={fontsize} textAnchor="middle" >{children}</SvgText>
      
      );
    }
    else
    {
      return (
      
        <SvgText x={x || 0} y={y ? y : '0.1em'} fill={fillcolor} onClick={() => this.props.showDetails(this.props.showText)} fontWeight="bold" stroke={strokeColor} fontSize={fontsize} textAnchor="middle" >{children}</SvgText>
      
      );
    }
  }
}

export default HexText;

