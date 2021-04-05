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
    const color = props.is_notification ? constants.white : constants.icon_color
    return (
      <View style={props.is_notification ? style.icon_view_small : style.icon_view}>
        <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 60 60">  
                <Path
                    d="M30,2.5
                    V57,5
                    "
                    stroke={color}
                    strokeWidth={constants.icon_stroke_thickness}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M2.5,30
                    H57,5
                    "
                    stroke={color}
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