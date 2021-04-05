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
import * as colors from '../../constants';


const Create = (props) => {
    return (
        <View style={style.icon_view}>
        <View style={style.icon_inner_view}>
            {/* <Svg viewBox="0 0 60 60">
                <Circle
                    cx="26"
                    cy="26"
                    r="23.5"
                    stroke="#999"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                />
                <Line
                    x1="57.5"
                    x2="43"
                    y1="57.5"
                    y2="43"
                    stroke="#999"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                />
            </Svg>  */}
            {/* <Svg viewBox="0 0 60 60">
                <Circle 
                    cx="30" 
                    cy="30" 
                    r="27.5"
                    stroke="#999" 
                    strokeWidth="5" 
                    fill="#999"
                />
                <Circle
                    cx="30"
                    cy="24.5"
                    r="10"
                    stroke="#eee"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                    transform="rotate(-45 30 30)"
                />
                <Line
                    x1="30"
                    x2="30"
                    y1="36"
                    y2="44.5"
                    stroke="#eee"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                    transform="rotate(-45 30 30)"
                />
            </Svg>  */}
            <Svg viewBox="0 0 60 60">
                <Circle
                    cx="30"
                    cy="21.5"
                    r="19"
                    stroke={colors.icon_color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                    transform="rotate(-45 30 30)"
                />
                <Line
                    x1="30"
                    x2="30"
                    y1="42"
                    y2="57.5"
                    stroke={colors.icon_color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                    transform="rotate(-45 30 30)"
                />
            </Svg> 
            </View>
        </View>
    )
}

export default Create

