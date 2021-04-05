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
            <Svg viewBox="0 0 90 60">
            {/* <Svg viewBox="0 0 60 60"> */}
                <Path 
                    d="M14,21
                    L45,2.9
                    L76,21
                    "
                    stroke={color}
                    strokeLinecap="round"
                    strokeWidth="5"
                />
                <Path 
                    d="M45,5
                    L67.5,18
                    V57.5
                    H22.5
                    V5.5
                    H26
                    V16
                    z
                    "
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={color}
                />
                {/* <Path 
                    d="M2.5,57.5
                    H21
                    v-20
                    H39
                    v20
                    H57.5
                    V25
                    L30,2.5
                    L2.5,25
                    z
                    "
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={props.is_focused ? color : '#0000'}
                /> */}
                {/* <Path 
                    d="M5.5,57.5
                    H23
                    v-16
                    H37
                    v16
                    H54.5
                    V28
                    H57.5
                    L30,2.5
                    L2.5,28
                    H5.5
                    z
                    "
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={props.is_focused ? color : '#0000'}
                />
            </Svg> */}                
                {/* <Path 
                    d="M5.5,57.5
                    H23
                    v-9
                    a7,7 0 0 1 14,0
                    v9
                    H54.5
                    V28
                    H57.5
                    L30,2.5
                    L2.5,28
                    H5.5
                    z
                    "
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={props.is_focused ? color : '#0000'}
                /> */}
            </Svg>
            </View>
        </View>
    )
}
  
//   #FFD24F
export default Create