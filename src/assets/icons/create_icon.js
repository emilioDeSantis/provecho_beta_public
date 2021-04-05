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
    const color = props.is_focused ? constants.icon_filled_color : constants.bottom_icon_color;
    return (
        <View style={style.icon_view}>
        <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 60 60">
                <Path
                d="M41.3,0H18.7C8.4,0,0,8.4,0,18.8v22.3C0,51.6,8.4,60,18.7,60h22.7C51.6,60,60,51.6,60,41.2V18.8
                C60,8.4,51.6,0,41.3,0z M50.4,33.6H33.6v16.8c0,2-1.6,3.6-3.6,3.6s-3.6-1.6-3.6-3.6V33.6H9.6C7.6,33.6,6,32,6,30s1.6-3.6,3.6-3.6
                h16.8V9.6C26.4,7.6,28,6,30,6s3.6,1.6,3.6,3.6v16.8h16.8c2,0,3.6,1.6,3.6,3.6C54,32,52.4,33.6,50.4,33.6z"
                fill={color}
                />
                {/* <Rect
                    x="2.5"
                    y="2.5"
                    width="55"
                    height="55"
                    stroke={color}
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    rx="16"
                    fill={props.is_focused ? color : '#0000'}
                />
                <Path
                    d="M30,15
                    V45
                    "
                    stroke={props.is_focused ? constants.bottom_bar_color : color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={constants.icon_stroke_thickness}
                />
                <Path
                    d="M15,30
                    H45
                    "
                    stroke={props.is_focused ? constants.bottom_bar_color : color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={constants.icon_stroke_thickness}
                /> */}
            </Svg> 
            </View>
        </View>
    )
}

export default Create