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
    const color = props.is_focused ? constants.icon_filled_color : props.is_white ? constants.white : props.is_yellow ? constants.yellow : constants.bottom_icon_color;
    return (
        <View style={style.icon_view}>
        <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 90 60">
                <Circle
                    cx="45"
                    cy="15"
                    r="15"
                    fill={color}
                />
                <Path d="M25.75,57.5
                    A6,4 0 0 1 19.75,53.5
                    A25.25,16 0 0 1 70.25,53.5
                    A6,4 0 0 1 64.25,57.5
                    z
                    "
                    fill={color}
                    stroke={color}
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                />
                {/* <Circle
                    cx="45"
                    cy="15"
                    r="12.5"
                    stroke={color}
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={props.is_focused ? color : '#0000'}
                />
                <Path d="M25.75,57.5
                    A6,4 0 0 1 19.75,53.5
                    A25.25,16 0 0 1 70.25,53.5
                    A6,4 0 0 1 64.25,57.5
                    z
                    "
                    stroke={color}
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={props.is_focused ? color : '#0000'}
                /> */}
            </Svg>
            </View>
        </View>
    )
}
  
export default Create