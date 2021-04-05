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
    const color = props.is_saved ? constants.icon_filled_color : constants.icon_color;
    return (
        <View style={style.icon_view}>
        <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 60 60">
                <Circle 
                    cx="30" 
                    cy="30" 
                    r="27.5"
                    stroke={props.is_outlined ? constants.dark_icon : color}
                    strokeWidth={constants.icon_stroke_thickness}
                    fill={props.is_outlined ? '#0000' : color}
                />
                <Path 
                    d="M30,42
                        V18
                    "
                    stroke={props.is_outlined ? constants.dark_icon : constants.white}
                    strokeWidth={constants.icon_stroke_thickness}
                    strokeLinecap="round"
                />
                <Path 
                    d="M21,33
                        L30,42
                        L39,33
                    "
                    stroke={props.is_outlined ? constants.dark_icon : constants.white}
                    strokeWidth={constants.icon_stroke_thickness}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
            </View>
        </View>
    )
}

export default Create