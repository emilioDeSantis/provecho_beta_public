import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
   
import React from 'react';
import { View } from 'react-native';
import style from '../style';
import * as constants from '../../constants';


const Create = (props) => {
    const color = props.is_notification ? constants.white : props.is_liked ? constants.pink : constants.icon_color;
    return (
        <View style={props.is_notification ? style.icon_view_small : style.icon_view}>
        <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 66.7 60">
                <Path 
                    transform="translate(-74.839 -1.83)"
                    d="M108.2,61.8l-4.8-4.3C86.2,42.3,74.8,32.2,74.8,19.8c0-9.8,8-17.9,18-18c0.1,0,0.2,0,0.3,0
                    c5.8,0,11.2,2.6,15,6.9c3.8-4.3,9.2-6.8,15-6.9c10-0.1,18.2,7.8,18.3,17.7c0,0.1,0,0.2,0,0.3c0,12.3-11.3,22.4-28.6,37.8
                    L108.2,61.8z"
                    fill={color}
                />
            </Svg>
            </View>
        </View>
    )
}
  
export default Create