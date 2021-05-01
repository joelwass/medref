import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Svg, { Circle, Rect } from 'react-native-svg';

class HexGrid extends Component {
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    viewBox: PropTypes.string,
    //children: PropTypes.node.isRequired
  };

  static defaultProps = {
    width: 800,
    height: 600,
    viewBox: "-50 -50 100 100"
  }

  render() {
    const { width, height, viewBox } = this.props
    return (  
      <Svg  width={width} height={height} viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
        {this.props.children}       
      </Svg>
    );
  }
}
export default HexGrid;

const styles = StyleSheet.create({
    grid: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });