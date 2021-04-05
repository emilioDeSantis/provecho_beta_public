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
    return (
        <View style={style.icon_view}>
            <View style={style.icon_inner_view}>
            <Svg viewBox="0 0 60 60">  
                <Path
                    d="M38.75,47.5
                    L21.25,30
                    L38.75,12.5
                    "
                    stroke={constants.icon_color}
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