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
            <Svg viewBox="0 0 60 60">
                <Path d="M23,53.5
                        A8.1,8.1 0 0 0 37,53.5
                    "
                    stroke={colors.icon_color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                />
                <Path d="M2.5,46
                        A7.5,13.5 0 0 0 10, 32.5
                        V22.5
                        A20,20 0 0 1 50, 22.5
                        V32.5
                        A7.5,13.5 0 0 0 57.5, 46
                        z
                    "
                    fill={colors.icon_color}
                    stroke={colors.icon_color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                />
                <Path d="M28,10.67
                        A12,12 0 0 0 19.09,17.5
                    "
                    stroke={colors.white}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                />
            </Svg> 
            </View>
        </View>
    )
}
  
export default Create