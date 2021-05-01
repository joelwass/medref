import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hex from '../models/Hex';
import HexUtils from '../HexUtils';
import Svg, { G, Polygon } from 'react-native-svg';
import { NavigationContext } from '@react-navigation/native';

class Hexagon extends Component {

  static contextType = NavigationContext;

  static propTypes = {
    q: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    fill: PropTypes.string,
    cellStyle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    className: PropTypes.string,
    data: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node,
    
    layout : PropTypes.object.isRequired,
    points : PropTypes.string.isRequired
  };

  //static contextTypes = {
    //layout: PropTypes.object, // TODO Shape
    //points: PropTypes.string
  //};

  constructor(props) {
    super(props);
    
    const { q, r, s } = this.props;
    const {points} = this.props.points;
    const {layout} = Object.assign(this.props.layout);
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, this.props.layout);
    this.state = { hex, pixel };
   
  }
  
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e, this);
    }
  }
  
  
  render() {
    const { fill, stroke, cellStyle, showDetails, className } = this.props;
    const { points } = this.props.points;
    const { hex, pixel } = this.state;
    const fillId = (fill) ? `url(#${fill})` : null;
    const {strokeWidth} = this.props.strokeWidth;
    
    return (
      <G
        transform={`translate(${pixel.x}, ${pixel.y})`}
        className={classNames('hexagon-group', className)}
      >
        <G className="hexagon">
            <Polygon
                points={this.props.points}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                onPress={() => this.props.showDetails(this.props.showText)}
            /> 
            {this.props.children}
        </G>
      </G>
    );
  }
}

export default Hexagon;
