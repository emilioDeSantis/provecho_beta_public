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
      const color = props.is_notification ? constants.white : constants.dark_icon
      return (
        <View style={props.is_notification ? style.icon_view_small : style.icon_view}>
          <View style={style.icon_inner_view}>
                <Svg viewBox="0 0 60 60">
                    <Path 
                        d="M38.1,52.3c-12.2,4.4-25.6-1.8-30-14c-2-5.5-1.8-11.2,0.1-16.2"
                        stroke={color}
                        strokeWidth={constants.icon_stroke_thickness}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path 
                        d="M38.1,52.3c-12.2,4.4-25.6-1.8-30-14c-2-5.5-1.8-11.2,0.1-16.2"
                        stroke={color}
                        strokeWidth={constants.icon_stroke_thickness}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(180 30 30)"
                    />
                    <Path 
                        d="M48.4,48.4l-12.6-2.6c-0.3-0.1-0.6,0.2-0.5,0.6l4,12.2c0.1,0.3,0.5,0.4,0.7,0.2l8.6-9.6
                        C48.9,48.9,48.7,48.5,48.4,48.4z"
                        fill={color}
                    />                
                    <Path 
                        d="M48.4,48.4l-12.6-2.6c-0.3-0.1-0.6,0.2-0.5,0.6l4,12.2c0.1,0.3,0.5,0.4,0.7,0.2l8.6-9.6
                        C48.9,48.9,48.7,48.5,48.4,48.4z"
                        fill={color}
                        transform="rotate(180 30 30)"
                    />
                </Svg>
                </View>
          </View>
      )
  }
  
  export default Create