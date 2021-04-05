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

   
const Copy = (props) => {
    const color = constants.dark_icon;
    return (
        <View style={style.icon_view}>
        <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 60 60">
                <Rect
                    x='2.5'
                    y='2.5'
                    width='40'
                    height='40'
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                    rx='7.5'
                />
                <Path 
                    d="M50,17.5
                    A7.5,7.5 0 0 1 57.5,25
                    V50
                    A7.5,7.5 0 0 1 50,57.5
                    H25
                    A7.5,7.5 0 0 1 17.5,50
                    "
                    stroke={color}
                    strokeLinejoin="round"
                    strokeWidth={constants.icon_stroke_thickness}
                />
            </Svg>
            </View>
        </View>
    )
}
export default Copy